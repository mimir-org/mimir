import { IsPartOfTerminal } from "../../../../helpers/Connectors";
import { Project } from "../../../../../../models";

/**
 * Function to find a node's childNode
 * @param nodeId - the parent node
 * @param project
 * @returns the parentNode
 */
// TODO: this is used to traverse down one step in BlockView. How to find the correct child node will be defined later.
export const GetChild = (nodeId: string, project: Project) => {
  const childEdge = project?.edges.find((e) => e.fromNodeId === nodeId && IsPartOfTerminal(e.toConnector));
  const childNode = project?.nodes.find((n) => n.id === childEdge?.toNodeId);

  return childNode?.id ?? nodeId;
};
