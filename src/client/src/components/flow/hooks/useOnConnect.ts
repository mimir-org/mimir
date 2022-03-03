import { EDGE_TYPE, EdgeType } from "../../../models/project";
import { SaveEventData } from "../../../redux/store/localStorage/localStorage";
import { CreateId, GetParent, IsPartOf, IsPartOfConnection, IsTransport, UpdateSiblingIndexOnEdgeConnect } from "../helpers";
import { addEdge, Connection, Elements, Edge as FlowEdge } from "react-flow-renderer";
import { createEdge, removeEdge, removeNode, setOffPageStatus } from "../../../redux/store/project/actions";
import { Connector, Edge, Node, Project } from "../../../models";
import { ConvertToEdge } from "../converters";
import { LibraryState } from "../../../redux/store/library/types";
import { IsOffPage } from "../../../helpers";
import { Dispatch } from "redux";

interface UseOnConnectParams {
  connection: FlowEdge | Connection;
  project: Project;
  setElements: React.Dispatch<React.SetStateAction<Elements>>;
  dispatch: Dispatch;
  edgeType: EdgeType;
  library: LibraryState;
  animatedEdge: boolean;
}

const useOnConnect = (params: UseOnConnectParams) => {
  SaveEventData(null, "edgeEvent");

  const { project, connection, library, edgeType, animatedEdge, setElements, dispatch } = params;
  const createdId = CreateId();
  const sourceNode = project.nodes.find((node) => node.id === connection.source);
  const targetNode = project.nodes.find((node) => node.id === connection.target);
  const existingEdge = GetExistingEdge(project, connection, sourceNode, targetNode);

  if (IsOffPage(sourceNode) && IsOffPage(targetNode)) {
    HandleOffPage(params, sourceNode, targetNode);
    return;
  }

  let sourceConn: Connector;
  let targetConn: Connector;
  let currentEdge: Edge;

  project.nodes?.forEach((node) => {
    node.connectors?.forEach((conn) => {
      if (conn.id === connection.sourceHandle) sourceConn = conn;
      if (conn.id === connection.targetHandle) targetConn = conn;
    });
  });

  if (IsPartOfConnection(sourceConn, targetConn)) HandlePartOfEdge(project, targetNode, dispatch);

  if (!existingEdge) {
    currentEdge = ConvertToEdge(createdId, sourceConn, targetConn, sourceNode, targetNode, project.id, library);
    dispatch(createEdge(currentEdge));
  } else currentEdge = existingEdge;

  if (IsPartOf(currentEdge?.fromConnector)) UpdateSiblingIndexOnEdgeConnect(currentEdge, project, dispatch);

  return setElements((els) => {
    return addEdge(
      {
        ...connection,
        id: createdId,
        type: edgeType,
        arrowHeadType: null,
        label: "",
        animated: edgeType === EDGE_TYPE.TREE_TRANSPORT && animatedEdge,
        data: {
          source: sourceNode,
          target: targetNode,
          edge: currentEdge,
        },
      },
      els
    );
  });
};

function GetExistingEdge(project: Project, connection: FlowEdge | Connection, sourceNode: Node, targetNode: Node) {
  return project.edges?.find(
    (edge) =>
      edge.fromConnectorId === connection.sourceHandle &&
      edge.toConnectorId === connection.targetHandle &&
      edge.fromNodeId === sourceNode.id &&
      edge.toNodeId === targetNode.id &&
      edge.isHidden === targetNode.isHidden
  );
}

function HandlePartOfEdge(project: Project, targetNode: Node, dispatch: Dispatch) {
  //  If a node has a partOf relation the new relation will replace it, => only one parent allowed.
  const existingPartOfEdge = project.edges?.find((edge) => edge.toNodeId === targetNode.id && IsPartOf(edge?.fromConnector));
  if (existingPartOfEdge) dispatch(removeEdge(existingPartOfEdge.id));
}

function HandleOffPage(params: UseOnConnectParams, sourceNode: Node, targetNode: Node) {
  const { project, connection, edgeType, library, dispatch, setElements } = params;

  const id = CreateId();
  const sourceParent = GetParent(sourceNode);
  const targetParent = GetParent(targetNode);

  const sourceTerminal = project.edges.find(
    (x) => x.fromConnector.nodeId === sourceParent.id && IsTransport(x.fromConnector) && x.toConnector.nodeId === sourceNode.id
  ).fromConnector;

  const targetTerminal = project.edges.find(
    (x) => x.toConnector.nodeId === targetParent.id && IsTransport(x.toConnector) && x.fromConnector.nodeId === targetNode.id
  ).toConnector;

  const edge = ConvertToEdge(id, sourceTerminal, targetTerminal, sourceParent, targetParent, project.id, library);
  dispatch(createEdge(edge));

  project.edges.forEach((x) => {
    if (IsOffPage(x.fromNode) || IsOffPage(x.toNode)) {
      dispatch(removeEdge(x.id));
    }
  });

  const isRequired = false;
  dispatch(removeNode(sourceNode.id));
  dispatch(removeNode(targetNode.id));
  dispatch(setOffPageStatus(sourceParent.id, sourceTerminal.id, isRequired));
  dispatch(setOffPageStatus(targetParent.id, targetTerminal.id, isRequired));

  return setElements((els) => {
    return addEdge(
      {
        ...connection,
        id: id,
        type: edgeType,
        arrowHeadType: null,
        label: "",
        animated: false,
        data: {
          source: sourceParent,
          target: targetParent,
          edge: edge,
        },
      },
      els
    );
  });
}

export default useOnConnect;
