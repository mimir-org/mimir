import { addEdge, Connection, Edge as FlowEdge } from "react-flow-renderer";
import { SaveEventData } from "../../../../redux/store/localStorage/localStorage";
import { IsPartOfTerminal, IsPartOfConnection, IsTransport } from "../../helpers/Connectors";
import { createEdge, removeEdge } from "../../../../redux/store/project/actions";
import { Node, Project } from "../../../../models";
import { ConvertToEdge } from "../../converters";
import { LibraryState } from "../../../../redux/store/library/types";
import { Dispatch } from "redux";
import { GetExistingEdge, GetTreeEdgeType } from "../helpers";
import { CreateId, UpdateSiblingIndexOnEdgeConnect } from "../../helpers";

interface Params {
  connection: FlowEdge | Connection;
  project: Project;
  setEdges: React.Dispatch<React.SetStateAction<FlowEdge[]>>;
  dispatch: Dispatch;
  library: LibraryState;
  animatedEdge: boolean;
}

/**
 * Hook that runs when two nodes connect via an Edge in TreeView.
 * @param params
 * @returns an Edge connection.
 */
const useOnConnectTree = (params: Params) => {
  SaveEventData(null, "edgeEvent");
  const { project, connection, library, animatedEdge, setEdges, dispatch } = params;
  const id = CreateId();
  const sourceNode = project.nodes.find((node) => node.id === connection.source);
  const sourceConn = sourceNode.connectors.find((c) => c.id === connection.sourceHandle);
  const targetNode = project.nodes.find((node) => node.id === connection.target);
  const targetConn = targetNode.connectors.find((c) => c.id === connection.targetHandle);
  const existingEdge = GetExistingEdge(project, connection, sourceNode, targetNode);

  if (IsPartOfConnection(sourceConn, targetConn)) HandlePartOfEdge(project, targetNode, dispatch);

  const currentEdge = existingEdge ?? ConvertToEdge(id, sourceConn, targetConn, sourceNode, targetNode, project.id, library);
  if (!existingEdge) dispatch(createEdge(currentEdge));

  if (IsPartOfTerminal(currentEdge?.fromConnector)) UpdateSiblingIndexOnEdgeConnect(currentEdge, project, dispatch);

  return setEdges((els) => {
    return addEdge(
      {
        ...connection,
        id: id,
        type: GetTreeEdgeType(sourceConn),
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

function HandlePartOfEdge(project: Project, targetNode: Node, dispatch: Dispatch) {
  //  If a node has a partOf relation the new relation will replace it, => only one parent allowed.
  const existingPartOfEdge = project.edges?.find(
    (edge) => edge.toNodeId === targetNode.id && IsPartOfTerminal(edge?.fromConnector)
  );
  if (existingPartOfEdge) dispatch(removeEdge(existingPartOfEdge.id));
}

export default useOnConnectTree;
