import { Node } from "../../../../../../models";

/**
 * Function to check if a node is a child node in ConnectView
 * @param mainConnectNodes - the main nodes in ConnectView
 * @param nodeId
 * @returns a boolean value
 */
const IsChildConnectNode = (mainConnectNodes: Node[], nodeId: string) => {
  let isChild = false;
  if (mainConnectNodes) {
    mainConnectNodes.forEach((x) => {
      x.connectNodes?.forEach((n) => {
        if (n.id === nodeId) {
          isChild = true;
        }
      });
    });
  }

  return isChild;
};

export default IsChildConnectNode;
