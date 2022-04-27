import { Node as FlowNode } from "react-flow-renderer";
import { BuildFlowChildNode } from "..";
import { IsOffPage } from "../../../../../helpers/Aspects";
import { IsFamily } from "../../../../../helpers/Family";
import { Edge, Node, Project } from "../../../../../models";
import { IsInputTerminal, IsOutputTerminal, IsPartOfTerminal, IsTransport } from "../../../helpers/Connectors";

/**
 * Component to draw all children FlowNodes in BlockView.
 * @param project
 * @param primaryNode
 * @param secondaryNode
 * @param flowNodes
 */
const DrawFlowChildNodes = (project: Project, primaryNode: Node, secondaryNode: Node, flowNodes: FlowNode[]) => {
  const nodes = project.nodes;
  const edges = project.edges;

  edges?.forEach((edge) => {
    if (!ValidateEdge(edge, primaryNode)) return;

    const targetNode = nodes.find((n) => n.id === edge.toNodeId);
    if (!targetNode) return;

    const childNode = BuildFlowChildNode(targetNode, primaryNode, secondaryNode, nodes);
    let isValid = true;

    if (IsOffPage(targetNode)) isValid = ValidateOffPage(nodes, edges, targetNode, primaryNode, secondaryNode, flowNodes);
    if (isValid && childNode) flowNodes.push(childNode);
  });
};

function ValidateEdge(edge: Edge, selectedNode: Node) {
  if (IsOffPage(edge.toNode)) return IsPartOfTerminal(edge.toConnector);
  return IsPartOfTerminal(edge.toConnector) && IsFamily(selectedNode, edge.toNode) && edge.fromNodeId === selectedNode?.id;
}

function ValidateOffPage(
  nodes: Node[],
  edges: Edge[],
  offPageNode: Node,
  selectedNode: Node,
  secondaryNode: Node,
  flowNodes: FlowNode[]
) {
  const offPageParentId = offPageNode.parentNodeId;

  if (!secondaryNode) return flowNodes.some((elem) => elem?.id === offPageParentId);
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
