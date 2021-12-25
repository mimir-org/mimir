import { Elements } from "react-flow-renderer";
import { TraverseProductNodes } from ".";
import { BuildBlockEdge, BuildProductChildNode } from "..";
import { IsProduct, IsAspectNode } from "../../../../../helpers";
import { Node, Edge, Connector } from "../../../../../models";
import { IsPartOf, IsTransportConnection } from "../../../helpers";
import { GetBlockEdgeType } from "../../helpers";

/**
 * Component to draw all children of a selected Product Node in BlockView.
 * @param edges
 * @param nodes
 * @param selectedNode
 * @param elements
 * @param animatedEdge
 * @param libOpen
 * @param explorerOpen
 * @param splitView
 */
const DrawProductChildren = (
  edges: Edge[],
  nodes: Node[],
  selectedNode: Node,
  elements: Elements<any>,
  animatedEdge: boolean,
  libOpen: boolean,
  explorerOpen: boolean,
  splitView: boolean
) => {
  const productChildren: Node[] = [];
  TraverseProductNodes(edges, nodes, selectedNode, productChildren);

  edges?.forEach((edge: Edge) => {
    let productEdge = null;
    if (ValidateProductEdge(edge.fromNode, edge.fromConnector, edge.toConnector))
      productEdge = BuildBlockEdge(nodes, edge, GetBlockEdgeType(edge.fromConnector), null, animatedEdge);
    if (productEdge) elements.push(productEdge);
  });

  productChildren.forEach((node) => {
    const productChildNode = BuildProductChildNode(node, libOpen, explorerOpen, splitView);
    if (productChildNode) elements.push(productChildNode);
  });
};

function ValidateProductEdge(fromNode: Node, source: Connector, target: Connector) {
  return (IsPartOf(source) || IsTransportConnection(source, target)) && IsProduct(fromNode) && !IsAspectNode(fromNode);
}

export default DrawProductChildren;
