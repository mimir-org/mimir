import { Elements } from "react-flow-renderer";
import { BuildSplitViewChildNode } from "..";
import { Node, Edge } from "../../../../../models";
import { IsFamily } from "../../../helpers";
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
      if (edge.fromNodeId === splitViewNode.id && IsFamily(splitViewNode, edge.toNode)) {
        const toNode = nodes.find((node) => node.id === edge.toNodeId && IsDirectChild(node, splitViewNode));
        const splitNode = nodes.find((node) => node.id === splitViewNode.id);

        if (toNode && splitNode) elements.push(BuildSplitViewChildNode(toNode, splitNode));
      }
    });
  }
};

export default DrawSplitViewChildren;
