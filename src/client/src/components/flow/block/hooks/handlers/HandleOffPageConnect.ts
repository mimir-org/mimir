import { addEdge } from "react-flow-renderer";
import { Node, Edge } from "@mimirorg/modelbuilder-types";
import { EDGE_TYPE } from "../../../../../models/project";
import { createEdge, deleteEdge } from "../../../../../redux/store/project/actions";
import { ConvertEdgeDataToMimirEdge } from "../../../converters";
import { CreateId } from "../../../helpers";
import { IsTerminal } from "../../../helpers/Connectors";
import { OnBlockDropParameters } from "../useOnBlockConnect";
import { IsOffPageEdge } from "../../helpers/IsOffPageEdge";
import { DeleteRequiredOffPageNode } from "../../nodes/blockNode/helpers/DeleteRequiredOffPageNode";

/**
 * Component to handle a connection between two OffPageNodes.
 * The OffPageNodes only serves as placeholders, and when the connection is completed the OffPageNodes are deleted,
 * and one new transport edge is created between the parents of the OffPageNodes.
 * This component is called from the useOnConnect hook.
 * @param params
 * @param sourceOffPageNode
 * @param targetOffPageNode
 * @returns a transport edge between the parents of the OffPageNodes.
 */
export const HandleOffPageConnect = (params: OnBlockDropParameters, sourceOffPageNode: Node, targetOffPageNode: Node) => {
  const { library, project, connection, dispatch, setEdges } = params;
  const id = CreateId();
  const sourceParent = project.nodes.find((n) => n.id === sourceOffPageNode?.parentNodeId);
  const targetParent = project.nodes.find((n) => n.id === targetOffPageNode?.parentNodeId);
  const sourceTerminal = GetSourceTerminal(project.edges, sourceOffPageNode?.parentNodeId, sourceOffPageNode?.id);
  const targetTerminal = GetTargetTerminal(project.edges, targetOffPageNode?.parentNodeId, targetOffPageNode?.id);

  if (!sourceTerminal || !targetTerminal) return null;

  const edge = ConvertEdgeDataToMimirEdge(id, sourceTerminal, targetTerminal, sourceParent, targetParent, project.id, library);
  dispatch(createEdge(edge));

  project.edges.forEach((e) => {
    if (IsOffPageEdge(e)) dispatch(deleteEdge(e.id));
  });

  // Remove OffPage nodes
  DeleteRequiredOffPageNode(sourceOffPageNode.id, sourceParent.id, sourceTerminal.id, dispatch);
  DeleteRequiredOffPageNode(targetOffPageNode.id, targetParent.id, targetTerminal.id, dispatch);

  const type = EDGE_TYPE.BLOCK_OFFPAGE;
  const data = { source: sourceParent, target: targetParent, edge };

  return setEdges((els) => {
    return addEdge({ ...connection, id, type, data }, els);
  });
};

function GetSourceTerminal(edges: Edge[], sourceParentId: string, sourceNodeId: string) {
  return edges.find(
    (e) => e.fromConnector.nodeId === sourceParentId && IsTerminal(e.fromConnector) && e.toConnector.nodeId === sourceNodeId
  ).fromConnector;
}

function GetTargetTerminal(edges: Edge[], targetParentId: string, targetNodeId: string) {
  return edges.find(
    (e) => e.toConnector.nodeId === targetParentId && IsTerminal(e.toConnector) && e.fromConnector.nodeId === targetNodeId
  ).toConnector;
}
