import { Elements } from "react-flow-renderer";
import { TraverseProductNodes } from ".";
import { BuildBlockEdge, BuildBlockNode } from "..";
import { IsProduct, IsAspectNode } from "../../../../../helpers";
import { Node, Edge, Connector } from "../../../../../models";
import { BlockNodeSize, EdgeType, EDGE_TYPE } from "../../../../../models/project";
import { IsPartOf } from "../../../helpers";

/**
 * Component to draw all children of a selected Product Node in BlockView.
 * @param edges
 * @param allNodes
 * @param selectedNode
 * @param elements
 * @param parentNode
 * @param parentNodeSize
 * @param animatedEdge
 */
const DrawProductChildren = (
  edges: Edge[],
  allNodes: Node[],
  selectedNode: Node,
  elements: Elements<any>,
  parentNode: Node,
  parentNodeSize: BlockNodeSize,
  animatedEdge: boolean
) => {
  const productChildren: Node[] = [];
  TraverseProductNodes(edges, allNodes, selectedNode, productChildren);

  productChildren.forEach((node) => {
    const productChildNode = BuildBlockNode(node, parentNode, parentNodeSize);
    productChildNode && elements.push(productChildNode);
  });

  edges?.forEach((edge: Edge) => {
    let productEdge = null;
    if (ValidateProductEdge(edge.fromNode, edge.toNode, edge.fromConnector, edge.toConnector))
      productEdge = BuildBlockEdge(allNodes, edge, EDGE_TYPE.BLOCK_PART as EdgeType, null, animatedEdge);
    productEdge && elements.push(productEdge);
  });
};

function ValidateProductEdge(fromNode: Node, toNode: Node, source: Connector, target: Connector) {
  return (IsPartOf(target) || IsPartOf(source)) && (IsProduct(toNode) || IsProduct(fromNode)) && !IsAspectNode(fromNode);
}

export default DrawProductChildren;
