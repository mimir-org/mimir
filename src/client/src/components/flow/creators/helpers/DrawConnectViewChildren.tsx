import { Elements } from "react-flow-renderer";
import { CreateBlockNode } from "..";
import { Node } from "../../../../models";

/**
 * Component to draw all ConnectView children nodes in BlockView.
 * @param mainConnectNodes
 * @param elements
 */
const DrawConnectViewChildren = (mainConnectNodes: Node[], elements: Elements<any>) => {
  mainConnectNodes.forEach((mainNode) => {
    mainNode.connectNodes?.forEach((node) => {
      const connectNode = mainConnectNodes.find((x) => x.id === node.id);
      if (connectNode) elements.push(CreateBlockNode(connectNode, mainNode, mainConnectNodes));
    });
  });
};

export default DrawConnectViewChildren;
