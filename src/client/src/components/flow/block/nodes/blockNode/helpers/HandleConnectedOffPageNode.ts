import { Dispatch } from "redux";
import { CreateConnectedOffPageNode } from "./CreateConnectedOffPageNode";
import { IsOffPage } from "../../../../../../helpers/Aspects";
import { Edge, Node, Project } from "../../../../../../models";
import { BlockNodeSize } from "../../../../../../models/project";
import { IsTransportConnection } from "../../../../helpers/Connectors";
import { GetParentNode } from "../../../../../../helpers/Family";

/**
 * Component to draw an OffPageNode that is connected.
 * This occurs if a targetNode or a sourceNode to a tranport edge is not displayed on the screen.
 * The OffPageNode is only a visual element, and is not part of the project's data model.
 * This component is called from the BlockNode component.
 * @param node
 * @param project
 * @param size
 * @param dispatch
 */
export const HandleConnectedOffPageNode = (node: Node, project: Project, size: BlockNodeSize, dispatch: Dispatch) => {
  if (!project || !node) return;

  project.edges.forEach((edge) => {
    if (!IsValidTransport(edge, node.id)) return;
    const isTarget = edge.toNodeId === node.id;
    if (!OnlyOneNodeVisible(edge, isTarget, project)) return;

    const nodeExists = HasConnectedOffPageNode(project.edges, edge, isTarget);
    if (nodeExists) return;

    const nodeParent = GetParentNode(node.id);

    const xPos = isTarget ? nodeParent?.positionBlockX : size.width;
    const connector = node.connectors.find((c) => (isTarget ? c.id === edge.toConnectorId : c.id === edge.fromConnectorId));
    const position = { x: xPos, y: node.positionBlockY };

    CreateConnectedOffPageNode(node, connector, position, dispatch);
  });
};

//#region Helpers
function HasConnectedOffPageNode(edges: Edge[], edge: Edge, isTargetNode: boolean) {
  const existingEdge = isTargetNode
    ? edges.find((x) => x.toConnectorId === edge.toConnectorId && IsOffPage(x.fromNode))
    : edges.find((x) => x.fromConnectorId === edge.fromConnectorId && IsOffPage(x.toNode));

  return existingEdge !== undefined;
}

function IsValidTransport(edge: Edge, nodeId: string) {
  const isTransport = IsTransportConnection(edge.fromConnector, edge.toConnector);
  const isNotOffPageTransport = !IsOffPage(edge.toNode) && !IsOffPage(edge.fromNode);
  const nodeHasEdge = nodeId === edge.fromNodeId || nodeId === edge.toNodeId;

  return isTransport && nodeHasEdge && isNotOffPageTransport;
}

/**
 * Function to verify that only one node from a connection is displayed on the screen.
 * If both nodes are visible there is no need to draw a Connected OffPageNode.
 * @param edge
 * @param isTarget
 * @param project
 * @returns a boolean value.
 */
function OnlyOneNodeVisible(edge: Edge, isTarget: boolean, project: Project) {
  const sourceNode = isTarget ? edge.fromNode : edge.toNode;
  const targetNode = isTarget ? edge.toNode : edge.fromNode;

  const sourceNodeParentId = GetParentNode(sourceNode?.id);
  const targetNodeParentId = GetParentNode(targetNode?.id);
  const targetNodeVisible = sourceNodeParentId === targetNodeParentId;

  return !targetNodeVisible;
}
//#endregion
