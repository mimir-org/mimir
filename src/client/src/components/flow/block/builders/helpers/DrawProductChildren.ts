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
 * @param allNodes
 * @param selectedNode
 * @param elements
 * @param animatedEdge
 */
const DrawProductChildren = (
  edges: Edge[],
  allNodes: Node[],
  selectedNode: Node,
  elements: Elements<any>,
  animatedEdge: boolean,
  libOpen: boolean,
  explorerOpen: boolean,
  secondaryNode: Node
) => {
  const productChildren: Node[] = [];
  TraverseProductNodes(edges, allNodes, selectedNode, productChildren);

  edges?.forEach((edge: Edge) => {
    let productEdge = null;
    if (ValidateProductEdge(edge.fromNode, edge.fromConnector, edge.toConnector))
      productEdge = BuildBlockEdge(allNodes, edge, GetBlockEdgeType(edge.fromConnector), null, animatedEdge);
    productEdge && elements.push(productEdge);
  });

  productChildren.forEach((node) => {
    const productChildNode = BuildProductChildNode(node, libOpen, explorerOpen, secondaryNode);
    productChildNode && elements.push(productChildNode);
  });
};

function ValidateProductEdge(fromNode: Node, source: Connector, target: Connector) {
  return (IsPartOf(source) || IsTransportConnection(source, target)) && IsProduct(fromNode) && !IsAspectNode(fromNode);
}

export default DrawProductChildren;
