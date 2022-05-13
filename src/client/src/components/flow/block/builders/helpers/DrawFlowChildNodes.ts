import { Node as FlowNode } from "react-flow-renderer";
import { BuildFlowChildNode } from "..";
import { IsOffPage } from "../../../../../helpers/Aspects";
import { IsFamily } from "../../../../../helpers/Family";
import { Edge, Node } from "../../../../../models";
import { IsInputTerminal, IsOutputTerminal, IsPartOfTerminal, IsTransport } from "../../../helpers/Connectors";

/**
 * Component to draw all children FlowNodes in BlockView.
 * @param nodes
 * @param edges
 * @param selectedNode
 * @param secondaryNode
 * @param flowNodes
 */
const DrawFlowChildNodes = (nodes: Node[], edges: Edge[], selectedNode: Node, secondaryNode: Node, flowNodes: FlowNode[]) => {
  edges.forEach((edge) => {
    if (!ValidateEdge(edge, selectedNode)) return;

    const targetNode = nodes.find((n) => n.id === edge.toNodeId);
    if (!targetNode) return;

    const childNode = BuildFlowChildNode(targetNode, selectedNode, secondaryNode, nodes);
    if (!childNode) return;
    let isValid = true;

    if (IsOffPage(targetNode)) isValid = ValidateOffPage(nodes, edges, targetNode, selectedNode, secondaryNode, flowNodes);
    if (!isValid) return;

    flowNodes.push(childNode);
  });
};

function ValidateEdge(edge: Edge, selectedNode: Node) {
  if (IsOffPage(edge.toNode)) return IsPartOfTerminal(edge.toConnector);
  return IsPartOfTerminal(edge.toConnector) && IsFamily(selectedNode, edge.toNode) && edge.fromNodeId === selectedNode.id;
}

/**
 * Function to verify if an OffPageNode should be drawn to the screen.
 * @param nodes
 * @param edges
 * @param offPageNode
 * @param selectedNode
 * @param secondaryNode
 * @param flowNodes
 * @returns a boolean value.
 */
function ValidateOffPage(
  nodes: Node[],
  edges: Edge[],
  offPageNode: Node,
  selectedNode: Node,
  secondaryNode: Node,
  flowNodes: FlowNode[]
) {
  const offPageParentId = offPageNode.parentNodeId;

  if (!secondaryNode) return flowNodes.some((elem) => elem.id === offPageParentId);
  if (!IsFamily(selectedNode, secondaryNode)) return false;

  const inputTerminal = offPageNode.connectors.find((c) => IsTransport(c) && IsInputTerminal(c));
  const outputTerminal = offPageNode.connectors.find((c) => IsTransport(c) && IsOutputTerminal(c));

  const edgeToOffPage = edges.find((e) => IsTransport(e.fromConnector) && e.toConnectorId === inputTerminal?.id);
  const edgeFromOffPage = edges.find((e) => IsTransport(e.fromConnector) && e.fromConnectorId === outputTerminal?.id);

  if (!edgeFromOffPage && !edgeToOffPage) return false;

  const node = edgeFromOffPage
    ? nodes.find((n) => n.id === edgeFromOffPage.toNodeId)
    : nodes.find((n) => n.id === edgeToOffPage.fromNodeId);

  if (!node) return false;

  const terminal = edgeFromOffPage
    ? node.connectors.find((c) => c.id === edgeFromOffPage.toConnectorId)
    : node.connectors.find((c) => c.id === edgeToOffPage.fromConnectorId);

  return terminal?.isRequired;
}

export default DrawFlowChildNodes;
