import { Elements } from "react-flow-renderer";
import { BuildChildNode } from "..";
import { IsFamily, IsOffPage } from "../../../../../helpers";
import { Connector, Edge, Node, Project } from "../../../../../models";
import { GetParent, IsInputTerminal, IsOutputTerminal, IsPartOf, IsTransport } from "../../../helpers";

/**
 * Component to draw all children nodes in BlockView.
 * @param project
 * @param selectedNode
 * @param elements
 * @param secondaryNode
 */
const DrawChildNodes = (project: Project, selectedNode: Node, elements: Elements, secondaryNode: Node) => {
  const nodes = project.nodes;
  const edges = project.edges;
  const splitView = secondaryNode !== null;

  edges?.forEach((edge) => {
    if (ValidateEdge(edge, selectedNode)) {
      const targetNode = nodes.find((n) => n.id === edge.toNode.id);
      if (!targetNode) return;

      if (IsOffPage(targetNode)) {
        const isValidOffPage = ValidateOffPageNode(targetNode, selectedNode, secondaryNode, elements, edges, nodes);
        if (isValidOffPage) elements.push(BuildChildNode(targetNode, splitView));
      } else elements.push(BuildChildNode(targetNode, splitView));
    }
  });
};

function ValidateEdge(edge: Edge, selectedNode: Node) {
  if (IsOffPage(edge.toNode)) return IsPartOf(edge.toConnector);
  return IsPartOf(edge.toConnector) && IsFamily(selectedNode, edge.toNode) && edge.fromNodeId === selectedNode?.id;
}

function ValidateOffPageNode(
  offPageNode: Node,
  selectedNode: Node,
  secondaryNode: Node,
  elements: Elements,
  edges: Edge[],
  nodes: Node[]
) {
  const offPageParent = GetParent(offPageNode);

  if (secondaryNode !== null) {
    if (!IsFamily(selectedNode, secondaryNode)) return false;
    const offPageInputTerminal = offPageNode.connectors.find((c) => IsTransport(c) && IsInputTerminal(c));
    const offPageOutputTerminal = offPageNode.connectors.find((c) => IsTransport(c) && IsOutputTerminal(c));

    const edgeToOffPage = edges.find((x) => IsTransport(x.fromConnector) && x.toConnectorId === offPageInputTerminal?.id);
    const edgeFromOffPage = edges.find((x) => IsTransport(x.fromConnector) && x.fromConnectorId === offPageOutputTerminal?.id);

    let terminal: Connector;

    if (edgeToOffPage) {
      const sourceNode = nodes.find((n) => n.id === edgeToOffPage?.fromNodeId);
      terminal = sourceNode?.connectors?.find((c) => c.id === edgeToOffPage?.fromConnectorId);
    }

    if (edgeFromOffPage) {
      const targetNode = nodes.find((n) => n.id === edgeFromOffPage?.toNodeId);
      terminal = targetNode?.connectors?.find((c) => c.id === edgeFromOffPage?.toConnectorId);
    }
    return terminal?.isRequired;
  }

  return elements?.some((elem) => elem?.id === offPageParent?.id);
}

export default DrawChildNodes;
