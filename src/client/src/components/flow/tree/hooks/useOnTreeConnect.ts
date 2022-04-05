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
const useOnTreeConnect = (params: Params) => {
  SaveEventData(null, "edgeEvent");
  const { project, connection, library, animatedEdge, setEdges, dispatch } = params;
  const id = CreateId();
  const source = project.nodes.find((node) => node.id === connection.source);
  const sourceConn = source.connectors.find((c) => c.id === connection.sourceHandle);
  const target = project.nodes.find((node) => node.id === connection.target);
  const targetConn = target.connectors.find((c) => c.id === connection.targetHandle);
  const existingEdge = GetExistingEdge(project, connection, source, target);

  if (IsPartOfConnection(sourceConn, targetConn)) HandlePartOfEdge(project, target, dispatch);

  const currentEdge = existingEdge ?? ConvertToEdge(id, sourceConn, targetConn, source, target, project.id, library);
  if (!existingEdge) dispatch(createEdge(currentEdge));

  if (IsPartOfTerminal(currentEdge?.fromConnector)) UpdateSiblingIndexOnEdgeConnect(currentEdge, project, dispatch);

  const type = GetTreeEdgeType(sourceConn);
  const animated = animatedEdge && IsTransport(sourceConn);

  return setEdges((els) => {
    return addEdge({ ...connection, id, type, animated, data: { source, target, edge: currentEdge } }, els);
  });
};

function HandlePartOfEdge(project: Project, targetNode: Node, dispatch: Dispatch) {
  //  If a node has a partOf relation the new relation will replace it, => only one parent allowed.
  const existingPartOfEdge = project.edges?.find(
    (edge) => edge.toNodeId === targetNode.id && IsPartOfTerminal(edge?.fromConnector)
  );
  if (existingPartOfEdge) dispatch(removeEdge(existingPartOfEdge.id));
}

export default useOnTreeConnect;
