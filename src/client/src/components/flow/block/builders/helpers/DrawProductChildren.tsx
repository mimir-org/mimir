import { Elements } from "react-flow-renderer";
import { TraverseProductNodes } from ".";
import { BuildBlockEdge, BuildBlockNode } from "..";
import { IsProduct, IsAspectNode } from "../../../../../helpers";
import { Node, Edge, Connector } from "../../../../../models";
import { BlockNodeSize, EdgeType, EDGE_TYPE } from "../../../../../models/project";
import { IsPartOf, IsTransportConnection } from "../../../helpers";
import { GetBlockEdgeType } from "../../helpers";

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
    if (ValidateProductEdge(edge.fromNode, edge.fromConnector, edge.toConnector))
      productEdge = BuildBlockEdge(allNodes, edge, GetBlockEdgeType(edge.fromConnector), null, animatedEdge);
    productEdge && elements.push(productEdge);
  });
};

function ValidateProductEdge(fromNode: Node, source: Connector, target: Connector) {
  return (IsPartOf(source) || IsTransportConnection(source, target)) && IsProduct(fromNode) && !IsAspectNode(fromNode);
}

export default DrawProductChildren;
