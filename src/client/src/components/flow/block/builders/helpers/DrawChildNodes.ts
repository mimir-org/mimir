import { Elements } from "react-flow-renderer";
import { BuildChildNode } from "..";
import { IsFamily, IsOffPage } from "../../../../../helpers";
import { Node, Edge, Connector, Project } from "../../../../../models";
import { GetParent, IsInputTerminal, IsOutputTerminal, IsPartOf, IsTransport } from "../../../helpers";

/**
 * Component to draw all children nodes in BlockView.
 * @param project
 * @param selectedNode
 * @param elements
 * @param libOpen
 * @param explorerOpen
 * @param splitView
 */
const DrawChildNodes = (
  project: Project,
  selectedNode: Node,
  elements: Elements<any>,
  libOpen: boolean,
  explorerOpen: boolean,
  splitView: boolean
) => {
  const nodes = project.nodes;
  const edges = project.edges;

  edges?.forEach((edge) => {
    if (ValidateEdge(edge, selectedNode)) {
      const toNode = nodes.find((n) => n.id === edge.toNode.id);
      if (!toNode) return;

      if (IsOffPage(toNode)) {
        const isValidOffPage = ValidateOffPageNode(toNode, splitView, elements, edges, nodes);
        if (isValidOffPage) elements.push(BuildChildNode(toNode, libOpen, explorerOpen, splitView));
      } else elements.push(BuildChildNode(toNode, libOpen, explorerOpen, splitView));
    }
  });
};

function ValidateEdge(edge: Edge, selectedNode: Node) {
  if (IsOffPage(edge.toNode)) return IsPartOf(edge.toConnector);
  return IsPartOf(edge.toConnector) && IsFamily(selectedNode, edge.toNode) && edge.fromNodeId === selectedNode?.id;
}

function ValidateOffPageNode(node: Node, splitView: boolean, elements: Elements<any>, edges: Edge[], nodes: Node[]) {
  const offPageParent = GetParent(node);

  if (splitView) {
    const offPageInputTerminal = node.connectors.find((c) => IsTransport(c) && IsInputTerminal(c));
    const offPageOutputTerminal = node.connectors.find((c) => IsTransport(c) && IsOutputTerminal(c));

    const edgeToOffPage = edges.find((x) => IsTransport(x.fromConnector) && x.toConnectorId === offPageInputTerminal?.id);
    const edgeFromOffPage = edges.find((x) => IsTransport(x.fromConnector) && x.fromConnectorId === offPageOutputTerminal?.id);

    let terminal: Connector;

    if (edgeToOffPage) {
      const sourceNode = nodes.find((n) => n.id === edgeToOffPage?.fromNodeId);
      terminal = sourceNode.connectors.find((c) => c.id === edgeToOffPage?.fromConnectorId);
    }

    if (edgeFromOffPage) {
      const targetNode = nodes.find((n) => n.id === edgeFromOffPage?.toNodeId);
      terminal = targetNode.connectors.find((c) => c.id === edgeFromOffPage?.toConnectorId);
    }
    return terminal?.isRequired;
  }

  return elements?.some((elem) => elem?.id === offPageParent?.id);
}

export default DrawChildNodes;
