import { Elements } from "react-flow-renderer";
import { TraverseProductNodes } from ".";
import { BuildBlockEdge, BuildProductChildNode } from "..";
import { IsProduct } from "../../../../../helpers";
import { Node, Connector, Project } from "../../../../../models";
import { IsTransportConnection } from "../../../helpers";
import { GetBlockEdgeType } from "../../helpers";

/**
 * Component to draw all children of a selected Product Node in BlockView.
 * @param project
 * @param selectedNode
 * @param elements
 * @param animatedEdge
 * @param libOpen
 * @param explorerOpen
 * @param splitView
 */
const DrawProductChildren = (
  project: Project,
  selectedNode: Node,
  elements: Elements<any>,
  animatedEdge: boolean,
  libOpen: boolean,
  explorerOpen: boolean,
  splitView: boolean
) => {
  const productChildren: Node[] = [];
  const nodes = project.nodes;
  const edges = project.edges;

  TraverseProductNodes(project, selectedNode, productChildren);

  productChildren.forEach((node) => {
    const productChildNode = BuildProductChildNode(node, libOpen, explorerOpen, splitView);
    if (productChildNode) elements.push(productChildNode);
  });

  edges?.forEach((edge) => {
    let productEdge = null;
    if (ValidateProductEdge(edge.fromNode, edge.toNode, edge.fromConnector, edge.toConnector)) {
      const edgeType = GetBlockEdgeType(edge.fromConnector);
      productEdge = BuildBlockEdge(nodes, edge, edgeType, null, animatedEdge, elements);
    }
    if (productEdge) elements.push(productEdge);
  });

  return elements;
};

function ValidateProductEdge(fromNode: Node, toNode: Node, source: Connector, target: Connector) {
  return IsProduct(fromNode) && IsProduct(toNode) && IsTransportConnection(source, target);
}

export default DrawProductChildren;
