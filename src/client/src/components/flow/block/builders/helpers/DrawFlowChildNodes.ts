import { Node as FlowNode } from "react-flow-renderer";
import { BuildFlowChildNode } from "..";
import { IsOffPage } from "../../../../../helpers/Aspects";
import { IsFamily } from "../../../../../helpers/Family";
import { Node, Edge } from "@mimirorg/modelbuilder-types";
import { IsInputConnector, IsOutputConnector, IsTerminal, IsPartOfRelation } from "../../../helpers/Connectors";

/**
 * Component to draw all children FlowNodes in BlockView.
 * @param nodes
 * @param edges
 * @param selectedBlockNode
 * @param secondaryNode
 * @param flowNodes
 */
const DrawFlowChildNodes = (
  nodes: Node[],
  edges: Edge[],
  selectedBlockNode: Node,
  secondaryNode: Node,
  flowNodes: FlowNode[]
) => {
  edges.forEach((edge) => {
    if (!ValidateEdge(edge, selectedBlockNode)) return;

    const targetNode = nodes.find((n) => n.id === edge.toNodeId);
    if (!targetNode) return;

    const childNode = BuildFlowChildNode(targetNode, selectedBlockNode, secondaryNode, nodes);
    if (!childNode) return;
    let isValid = true;

    if (IsOffPage(targetNode)) isValid = ValidateOffPage(nodes, edges, targetNode, selectedBlockNode, secondaryNode, flowNodes);
    if (!isValid) return;

    flowNodes.push(childNode);
  });
};

function ValidateEdge(edge: Edge, selectedBlockNode: Node) {
  if (IsOffPage(edge.toNode)) return IsPartOfRelation(edge.toConnector);
  return (
    IsPartOfRelation(edge.toConnector) && IsFamily(selectedBlockNode, edge.toNode) && edge.fromNodeId === selectedBlockNode.id
  );
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

  const inputTerminal = offPageNode.connectors.find((c) => IsTerminal(c) && IsInputConnector(c));
  const outputTerminal = offPageNode.connectors.find((c) => IsTerminal(c) && IsOutputConnector(c));

  const edgeToOffPage = edges.find((e) => IsTerminal(e.fromConnector) && e.toConnectorId === inputTerminal?.id);
  const edgeFromOffPage = edges.find((e) => IsTerminal(e.fromConnector) && e.fromConnectorId === outputTerminal?.id);

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
