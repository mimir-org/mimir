import { Elements } from "react-flow-renderer";
import { BuildChildNode } from "..";
import { IsFamily, IsOffPage } from "../../../../../helpers";
import { Node, Edge, Connector } from "../../../../../models";
import { GetParent, IsInputTerminal, IsOutputTerminal, IsPartOf, IsTransport } from "../../../helpers";

/**
 * Component to draw all children nodes in BlockView.
 * @param edges
 * @param nodes
 * @param selectedNode
 * @param elements
 * @param libOpen
 * @param explorerOpen
 * @param secondaryNode
 */
const DrawChildNodes = (
  edges: Edge[],
  nodes: Node[],
  selectedNode: Node,
  elements: Elements<any>,
  libOpen: boolean,
  explorerOpen: boolean,
  secondaryNode: Node
) => {
  edges?.forEach((edge) => {
    if (ValidateEdge(edge, selectedNode)) {
      const toNode = nodes.find((n) => n.id === edge.toNode.id);
      if (IsOffPage(toNode)) {
        const isValidOffPage = ValidateOffPageNode(toNode, secondaryNode, elements, edges, nodes);
        if (toNode && isValidOffPage) elements.push(BuildChildNode(toNode, libOpen, explorerOpen, secondaryNode));
      } else {
        if (toNode) elements.push(BuildChildNode(toNode, libOpen, explorerOpen, secondaryNode));
      }
    }
  });
};

function ValidateEdge(edge: Edge, selectedNode: Node) {
  if (IsOffPage(edge.toNode)) return IsPartOf(edge.toConnector);
  return edge.fromNodeId === selectedNode?.id && IsFamily(selectedNode, edge.toNode) && IsPartOf(edge.toConnector);
}

export function ValidateOffPageNode(node: Node, secondaryNode: Node, elements: Elements<any>, edges: Edge[], nodes: Node[]) {
  const offPageParent = GetParent(node);

  if (secondaryNode) {
    const offPageInputTerminal = node.connectors.find((c) => IsTransport(c) && IsInputTerminal(c));
    const offPageOutputTerminal = node.connectors.find((c) => IsTransport(c) && IsOutputTerminal(c));

    const edgeToOffPage = edges.find((x) => IsTransport(x.fromConnector) && x.toConnectorId === offPageInputTerminal.id);
    const edgeFromOffPage = edges.find((x) => IsTransport(x.fromConnector) && x.fromConnectorId === offPageOutputTerminal.id);

    let terminal: Connector;

    if (edgeToOffPage) {
      const sourceNode = nodes.find((n) => n.id === edgeToOffPage.fromNodeId);
      terminal = sourceNode.connectors.find((c) => c.id === edgeToOffPage.fromConnectorId);
    }

    if (edgeFromOffPage) {
      const targetNode = nodes.find((n) => n.id === edgeFromOffPage.toNodeId);
      terminal = targetNode.connectors.find((c) => c.id === edgeFromOffPage.toConnectorId);
    }
    return terminal?.isRequired;
  }

  return elements?.some((elem) => elem?.id === offPageParent?.id);
}

export default DrawChildNodes;
