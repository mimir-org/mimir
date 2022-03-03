import { EDGE_TYPE } from "../../../models/project";
import { SaveEventData } from "../../../redux/store/localStorage/localStorage";
import { CreateId, GetParent, IsPartOf, IsTransport, UpdateSiblingIndexOnEdgeConnect } from "../helpers";
import { addEdge, Connection, Elements, Edge as FlowEdge } from "react-flow-renderer";
import { createEdge, removeEdge, removeNode, setOffPageStatus } from "../../../redux/store/project/actions";
import { Node, Project } from "../../../models";
import { ConvertToEdge } from "../converters";
import { LibraryState } from "../../../redux/store/library/types";
import { IsOffPage } from "../../../helpers";
import { Dispatch } from "redux";
import { GetBlockEdgeType } from "../block/helpers";
import { GetExistingEdge } from "./helpers";

interface Params {
  connection: FlowEdge | Connection;
  project: Project;
  setElements: React.Dispatch<React.SetStateAction<Elements>>;
  dispatch: Dispatch;
  library: LibraryState;
  animatedEdge: boolean;
}

/**
 * Hook that runs when two nodes connect via an Edge in BlockView.
 * @param interface
 * @returns an Edge connection.
 */
const useOnConnectBlock = (params: Params) => {
  SaveEventData(null, "edgeEvent");
  const { project, connection, library, animatedEdge, setElements, dispatch } = params;
  const id = CreateId();
  const sourceNode = project.nodes.find((node) => node.id === connection.source);
  const sourceConn = sourceNode.connectors.find((c) => c.id === connection.sourceHandle);
  const targetNode = project.nodes.find((node) => node.id === connection.target);
  const targetConn = targetNode.connectors.find((c) => c.id === connection.targetHandle);
  const existingEdge = GetExistingEdge(project, connection, sourceNode, targetNode);

  if (IsOffPage(sourceNode) && IsOffPage(targetNode)) {
    HandleOffPage(params, sourceNode, targetNode);
    return;
  }

  const currentEdge = existingEdge ?? ConvertToEdge(id, sourceConn, targetConn, sourceNode, targetNode, project.id, library);
  if (!existingEdge) dispatch(createEdge(currentEdge));

  if (IsPartOf(currentEdge?.fromConnector)) UpdateSiblingIndexOnEdgeConnect(currentEdge, project, dispatch);

  return setElements((els) => {
    return addEdge(
      {
        ...connection,
        id: id,
        type: GetBlockEdgeType(sourceConn, sourceNode, targetNode),
        animated: animatedEdge && IsTransport(sourceConn),
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

function HandleOffPage(params: Params, sourceNode: Node, targetNode: Node) {
  const { project, connection, library, dispatch, setElements } = params;

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
        type: EDGE_TYPE.BLOCK_OFFPAGE,
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

export default useOnConnectBlock;
