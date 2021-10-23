import { Elements } from "react-flow-renderer";
import { BuildSplitViewChildNode } from "..";
import { Node, Edge } from "../../../../../models";
import { IsDirectChild } from "../../helpers";

/**
 * Component to draw all SplitView children nodes in BlockView.
 * @param edges
 * @param nodes
 * @param splitViewNode
 * @param elements
 */
const DrawSplitViewChildren = (edges: Edge[], nodes: Node[], splitViewNode: Node, elements: Elements<any>) => {
  if (splitViewNode) {
    edges.forEach((edge) => {
      if (edge.fromNodeId === splitViewNode.id && splitViewNode.aspect === edge.toNode.aspect) {
        const toNode = nodes.find((node) => node.id === edge.toNodeId && IsDirectChild(node, splitViewNode));
        if (toNode) elements.push(BuildSplitViewChildNode(toNode, splitViewNode));
      }
    });
  }
};

export default DrawSplitViewChildren;
