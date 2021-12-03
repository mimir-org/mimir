import { EdgeType, EDGE_TYPE } from "../../../models/project";
import { SaveEventData } from "../../../redux/store/localStorage/localStorage";
import { CreateId, IsPartOf, UpdateSiblingIndexOnEdgeConnect } from "../helpers";
import { addEdge } from "react-flow-renderer";
import { createEdge, removeEdge, setOffPageStatus } from "../../../redux/store/project/actions";
import { Connector, Edge, Node, Project } from "../../../models";
import { ConvertToEdge } from "../converters";
import { LibraryState } from "../../../redux/store/library/types";
import { IsOffPage } from "../../../helpers";

const useOnConnect = (
  params: any,
  project: Project,
  setElements: any,
  dispatch: any,
  edgeType: EdgeType,
  library: LibraryState,
  animatedEdge: boolean
) => {
  SaveEventData(null, "edgeEvent");
  const createdId = CreateId();
  const sourceNode = project.nodes.find((node) => node.id === params.source);
  const targetNode = project.nodes.find((node) => node.id === params.target);

  let sourceConn: Connector;
  let targetConn: Connector;
  let currentEdge: Edge;

  project.nodes?.forEach((node) => {
    node.connectors?.forEach((conn) => {
      if (conn.id === params.sourceHandle) sourceConn = conn;
      if (conn.id === params.targetHandle) targetConn = conn;
    });
  });

  const existingEdge = GetExistingEdge(project, params, sourceNode, targetNode);

  if (IsPartOf(sourceConn) && IsPartOf(targetConn)) HandlePartOfEdge(project, targetNode, dispatch);

  if (!existingEdge) {
    currentEdge = ConvertToEdge(createdId, sourceConn, targetConn, sourceNode, targetNode, project.id, library, animatedEdge);
    dispatch(createEdge(currentEdge));
  } else currentEdge = existingEdge;

  if (IsPartOf(currentEdge?.fromConnector)) UpdateSiblingIndexOnEdgeConnect(currentEdge, project, dispatch);
  if (IsOffPage(sourceNode)) dispatch(setOffPageStatus(sourceNode.id, false));

  return setElements((els) => {
    return addEdge(
      {
        ...params,
        id: createdId,
        type: edgeType,
        arrowHeadType: null,
        label: "",
        animated: edgeType === EDGE_TYPE.TRANSPORT && animatedEdge,
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

function GetExistingEdge(project: Project, params: any, sourceNode: Node, targetNode: Node) {
  return project.edges?.find(
    (edge) =>
      edge.fromConnectorId === params.sourceHandle.id &&
      edge.toConnectorId === params.targetHandle.id &&
      edge.fromNodeId === sourceNode.id &&
      edge.toNodeId === targetNode.id &&
      edge.isHidden === targetNode.isHidden
  );
}

function HandlePartOfEdge(project: Project, targetNode: Node, dispatch: any) {
  //  If a node has a partOf relation the new relation will replace it, => only one parent allowed.
  const existingPartOfEdge = project.edges?.find((edge) => edge.toNodeId === targetNode.id && IsPartOf(edge?.fromConnector));
  if (existingPartOfEdge) dispatch(removeEdge(existingPartOfEdge.id));
}

export default useOnConnect;
