import { CreateConnectedOffPageNode, HasOffPageNode } from ".";
import { IsOffPage } from "../../../../../../helpers";
import { Edge, Node } from "../../../../../../models";
import { BlockNodeSize } from "../../../../../../models/project";
import { removeEdge, removeNode } from "../../../../../../redux/store/project/actions";
import { GetParent, IsTransport } from "../../../../helpers";

/**
 * Component to draw an OffPageNode that is connected.
 * This occurs if a targetNode or a sourceNode to a tranport edge is not displayed on the screen. The OffPageNode is only
 * a visual element, and is not part of the project's data model.
 * @param node
 * @param edges
 * @param size
 * @param blockElements
 * @param secondaryNode
 * @param dispatch
 */
const HandleConnectedOffPageNode = (
  node: Node,
  edges: Edge[],
  size: BlockNodeSize,
  blockElements: any[],
  secondaryNode: Node,
  dispatch: any
) => {
  edges.forEach((edge) => {
    if (IsValidTransport(edge)) {
      const isNodeTarget = edge.toNodeId === node.id;

      const connector = node?.connectors.find((c) =>
        isNodeTarget ? c.id === edge.toConnectorId : c.id === edge.fromConnectorId
      );

      if (OnlyOneNodeVisible(blockElements, node, edge, isNodeTarget)) {
        const offPageExists = HasOffPageNode(edges, edge.fromConnector);

        if (!secondaryNode && !offPageExists) {
          const nodeParent = GetParent(node);
          const xPos = isNodeTarget ? nodeParent?.positionBlockX : size.width;
          CreateConnectedOffPageNode(node, connector, { x: xPos, y: node?.positionBlockY }, dispatch);
        }
      }
    }
    if (IsOffPage(edge.toNode) && !DoesOriginalEdgeExist(edge, edges)) {
      dispatch(removeNode(edge.toNode.id));
      dispatch(removeEdge(edge.id));
    }
  });
};

/**
 * Function to check if a transport edge exists, but only with one node visible.
 * @param elements
 * @param node
 * @param edge
 * @param isNodeTarget
 * @returns a boolean value
 */
function OnlyOneNodeVisible(elements: any[], node: Node, edge: Edge, isNodeTarget: boolean) {
  const sourceNode = isNodeTarget ? edge.fromNode : node;
  const targetNode = isNodeTarget ? node : edge.toNode;

  const sourceNodeParent = GetParent(sourceNode);
  const targetNodeParent = GetParent(targetNode);

  const sourceNodeVisible = isNodeTarget
    ? sourceNodeParent.id === targetNodeParent.id
    : elements.some((elem) => elem.id === sourceNode.id);

  const targetNodeVisible = isNodeTarget
    ? elements.some((elem) => elem.id === sourceNode.id)
    : sourceNodeParent.id === targetNodeParent.id;

  return isNodeTarget ? !sourceNodeVisible && targetNodeVisible : sourceNodeVisible && !targetNodeVisible;
}

function IsValidTransport(edge: Edge) {
  return IsTransport(edge.fromConnector) && !IsOffPage(edge.toNode) && !IsOffPage(edge.fromNode);
}

function DoesOriginalEdgeExist(edge: Edge, edges: Edge[]) {
  const sourceConnector = edge.fromConnector;
  return edges.some((x) => x.fromConnectorId === sourceConnector?.id && !IsOffPage(edge.toNode));
}

export default HandleConnectedOffPageNode;
