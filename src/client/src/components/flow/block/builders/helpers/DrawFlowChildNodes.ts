import { Elements } from "react-flow-renderer";
import { BuildFlowChildNode } from "..";
import { IsFamily, IsOffPage } from "../../../../../helpers";
import { Edge, Node, Project } from "../../../../../models";
import { GetParent, IsInputTerminal, IsOutputTerminal, IsPartOf, IsTransport } from "../../../helpers";

/**
 * Component to draw all children FlowNodes in BlockView.
 * @param project
 * @param primaryNode
 * @param secondaryNode
 * @param elements
 */
const DrawFlowChildNodes = (project: Project, primaryNode: Node, secondaryNode: Node, elements: Elements) => {
  const nodes = project.nodes;
  const edges = project.edges;

  edges?.forEach((edge) => {
    if (!ValidateEdge(edge, primaryNode)) return;

    const targetNode = nodes.find((n) => n.id === edge.toNode.id);
    if (!targetNode) return;

    const childNode = BuildFlowChildNode(targetNode, primaryNode, secondaryNode);
    let isValid = true;

    if (IsOffPage(targetNode)) isValid = ValidateOffPage(targetNode, primaryNode, secondaryNode, elements, edges, nodes);
    if (isValid && childNode) elements.push(childNode);
  });
};

function ValidateEdge(edge: Edge, selectedNode: Node) {
  if (IsOffPage(edge.toNode)) return IsPartOf(edge.toConnector);
  return IsPartOf(edge.toConnector) && IsFamily(selectedNode, edge.toNode) && edge.fromNodeId === selectedNode?.id;
}

function ValidateOffPage(
  offPageNode: Node,
  selectedNode: Node,
  secondaryNode: Node,
  elements: Elements,
  edges: Edge[],
  nodes: Node[]
) {
  const offPageParent = GetParent(offPageNode?.id);

  if (!secondaryNode) return elements?.some((elem) => elem?.id === offPageParent?.id);
  if (!IsFamily(selectedNode, secondaryNode)) return false;

  const inputTerminal = offPageNode.connectors.find((c) => IsTransport(c) && IsInputTerminal(c));
  const outputTerminal = offPageNode.connectors.find((c) => IsTransport(c) && IsOutputTerminal(c));

  const edgeToOffPage = edges.find((x) => IsTransport(x.fromConnector) && x.toConnectorId === inputTerminal?.id);
  const edgeFromOffPage = edges.find((x) => IsTransport(x.fromConnector) && x.fromConnectorId === outputTerminal?.id);

  if (!edgeFromOffPage && !edgeToOffPage) return false;

  const node = edgeFromOffPage
    ? nodes.find((n) => n.id === edgeFromOffPage.toNodeId)
    : nodes.find((n) => n.id === edgeToOffPage.fromNodeId);

  const terminal = edgeFromOffPage
    ? node?.connectors?.find((c) => c.id === edgeFromOffPage.toConnectorId)
    : node?.connectors?.find((c) => c.id === edgeToOffPage.fromConnectorId);

  return terminal?.isRequired;
}

export default DrawFlowChildNodes;
