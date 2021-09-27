import { FindNodeByDataId } from "../";
import { Size } from "../../../../../compLibrary";

/**
 * Function to resize the ConnectView node based on number of children
 * @param nodeCount
 * @param mainNodeId
 * @param nodeId
 */
const ResizeMainConnectNode = (
  nodeCount: number,
  mainNodeId: string,
  nodeId: string
) => {
  const mainNode = FindNodeByDataId(mainNodeId);
  let newHeight = Size.Node_Length;
  let percent = 16;
  let count = 1;

  // Calculate resize
  if (nodeCount % 2 === 0)
    count = Math.ceil(nodeCount - (nodeCount * percent) / 100);

  if (nodeCount % 2 !== 0)
    count = Math.ceil(1 + nodeCount - (nodeCount * percent) / 100);

  const resize = newHeight * count;

  // Execute resize
  if (mainNode) {
    mainNode.style.height = `${resize}px`;
    mainNode.style.width = `${Size.ConnectView_Width}px`;
    mainNode.style.zIndex = "1";
    if (nodeCount >= 5) mainNode.style.maxHeight = `${resize - 50}px`;
  } else {
    let node = FindNodeByDataId(nodeId);
    if (node) {
      node.style.width = `${Size.Node_Width}px`;
      node.style.height = `${Size.Node_Length}px`;
    }
  }
};

export default ResizeMainConnectNode;
