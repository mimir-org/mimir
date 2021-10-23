import { Elements } from "react-flow-renderer";
import { BuildBlockNode } from "..";
import { Node } from "../../../../../models";

/**
 * Component to draw all ConnectView children nodes in BlockView.
 * @param mainConnectNodes
 * @param elements
 * @param allNodes
 * @param parentNode
 */
const DrawConnectViewChildren = (
  mainConnectNodes: Node[],
  elements: Elements<any>,
  allNodes: Node[],
  parentNode: Node
) => {
  mainConnectNodes.forEach((mainNode) => {
    mainNode.connectNodes?.forEach((node) => {
      const connectNode = allNodes.find((n) => n.id === node.id);
      if (connectNode) elements.push(BuildBlockNode(connectNode, mainNode, allNodes, parentNode));
    });
  });
};

export default DrawConnectViewChildren;
