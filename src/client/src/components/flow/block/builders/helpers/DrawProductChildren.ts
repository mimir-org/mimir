import { Elements } from "react-flow-renderer";
import { TraverseProductNodes } from ".";
import { BuildBlockEdge, BuildProductChildNode } from "..";
import { IsAspectNode, IsOffPage, IsProduct } from "../../../../../helpers";
import { Connector, Node, Project } from "../../../../../models";
import { IsPartOfConnection, IsTransportConnection } from "../../../helpers";
import { GetBlockEdgeType } from "../../helpers";

/**
 * Component to draw all children of a selected Product Node in BlockView. The Product Aspect has a different view than the other aspects,
 * where the nodes are displayed in a tree stucture in BlockView.
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
  elements: Elements,
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
    if (ValidateProductEdge(edge.fromNode, edge.toNode, selectedNode, edge.fromConnector, edge.toConnector)) {
      const edgeType = GetBlockEdgeType(edge.fromConnector);
      productEdge = BuildBlockEdge(nodes, edge, edgeType, null, animatedEdge);
    }
    if (productEdge) elements.push(productEdge);
  });

  return elements;
};

function ValidateProductEdge(
  sourceNode: Node,
  targetNode: Node,
  selectedNode: Node,
  sourceConn: Connector,
  targetConn: Connector
) {
  return (
    ((IsProduct(sourceNode) && IsProduct(targetNode)) || IsOffPage(sourceNode) || IsOffPage(targetNode)) &&
    !IsAspectNode(sourceNode) &&
    !IsAspectNode(targetNode) &&
    sourceNode.id !== selectedNode?.id &&
    (IsTransportConnection(sourceConn, targetConn) ||
      (IsPartOfConnection(sourceConn, targetConn) && !IsOffPage(sourceNode) && !IsOffPage(targetNode)))
  );
}

export default DrawProductChildren;
