import { Elements } from "react-flow-renderer";
import { BuildBlockEdge, BuildBlockNode } from "..";
import { IsOffPage, IsProduct, IsAspectNode } from "../../../../../helpers";
import { Node, Edge } from "../../../../../models";
import { BlockNodeSize, EdgeType, EDGE_TYPE } from "../../../../../models/project";
import { IsPartOf } from "../../../helpers";

/**
 * Component to draw all Product children in BlockView.
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
  allNodes?.forEach((node) => {
    let productChildNode = null;
    if (!IsOffPage(node) && IsProduct(node) && !IsAspectNode(node))
      productChildNode = BuildBlockNode(node, parentNode, parentNodeSize);
    if (productChildNode) elements.push(productChildNode);
  });

  edges?.forEach((edge: Edge) => {
    let productEdge = null;
    if (
      (IsPartOf(edge.toConnector) || IsPartOf(edge.fromConnector)) &&
      (IsProduct(edge.toNode) || IsProduct(edge.fromNode)) &&
      !IsAspectNode(edge.fromNode)
    )
      productEdge = BuildBlockEdge(allNodes, edge, EDGE_TYPE.BLOCK_PART as EdgeType, null, animatedEdge);
    if (productEdge) elements.push(productEdge);
  });
};

export default DrawProductChildren;
