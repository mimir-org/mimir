import { Node } from "../../../../../../models";

/**
 * Function to see if a ConnectNode is checked.
 * @param node
 * @param connectNodes
 * @returns a boolean value
 */
const IsConnectNodeChecked = (node: Node, connectNodes: Node[]) => {
  let isChecked = false;

  connectNodes?.forEach((element) => {
    if (element.id === node.id) isChecked = true;
  });

  return isChecked;
};

export default IsConnectNodeChecked;
