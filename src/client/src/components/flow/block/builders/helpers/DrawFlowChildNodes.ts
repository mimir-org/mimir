import { Node as FlowNode } from "react-flow-renderer";
import { BuildFlowChildNode } from "..";
import { IsOffPage } from "../../../../../helpers/Aspects";
import { GetParentNode, IsFamily } from "../../../../../helpers/Family";
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

    const targetNode = nodes.find((n) => n.id === edge.toNode.id);
    if (!targetNode) return;

    const childNode = BuildFlowChildNode(targetNode, primaryNode, secondaryNode, project);
    let isValid = true;

    if (IsOffPage(targetNode)) isValid = ValidateOffPage(project, targetNode, primaryNode, secondaryNode, flowNodes);
    if (isValid && childNode) flowNodes.push(childNode);
  });
};

function ValidateEdge(edge: Edge, selectedNode: Node) {
  if (IsOffPage(edge.toNode)) return IsPartOfTerminal(edge.toConnector);
  return IsPartOfTerminal(edge.toConnector) && IsFamily(selectedNode, edge.toNode) && edge.fromNodeId === selectedNode?.id;
}

function ValidateOffPage(project: Project, offPageNode: Node, selectedNode: Node, secondaryNode: Node, flowNodes: FlowNode[]) {
  const offPageParentId = GetParentNode(offPageNode?.id)?.id;

  if (!secondaryNode) return flowNodes?.some((elem) => elem?.id === offPageParentId);
  if (!IsFamily(selectedNode, secondaryNode)) return false;

  const inputTerminal = offPageNode.connectors.find((c) => IsTransport(c) && IsInputTerminal(c));
  const outputTerminal = offPageNode.connectors.find((c) => IsTransport(c) && IsOutputTerminal(c));

  const edgeToOffPage = project.edges.find((x) => IsTransport(x.fromConnector) && x.toConnectorId === inputTerminal?.id);
  const edgeFromOffPage = project.edges.find((x) => IsTransport(x.fromConnector) && x.fromConnectorId === outputTerminal?.id);

  if (!edgeFromOffPage && !edgeToOffPage) return false;

  const node = edgeFromOffPage
    ? project.nodes.find((n) => n.id === edgeFromOffPage.toNodeId)
    : project.nodes.find((n) => n.id === edgeToOffPage.fromNodeId);

  const terminal = edgeFromOffPage
    ? node?.connectors?.find((c) => c.id === edgeFromOffPage.toConnectorId)
    : node?.connectors?.find((c) => c.id === edgeToOffPage.fromConnectorId);

  return terminal?.isRequired;
}

export default DrawFlowChildNodes;
