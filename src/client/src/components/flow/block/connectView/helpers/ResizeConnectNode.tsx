import { GetNodeByDataId } from "../../helpers";
import { Size } from "../../../../../compLibrary";
import { Node } from "../../../../../models";

/**
 * Function to resize the ConnectView node based on number of children
 * @param nodeCount
 * @param mainNode
 * @param data
 */
const ResizeConnectNode = (nodeCount: number, mainNode: Node, data: Node) => {
  const flowMainNode = GetNodeByDataId(mainNode?.id);
  const percent = 16;
  let count = 1;

  // Calculate resize
  if (nodeCount % 2 === 0) count = Math.ceil(nodeCount - (nodeCount * percent) / 100);
  if (nodeCount % 2 !== 0) count = Math.ceil(1 + nodeCount - (nodeCount * percent) / 100);
  const newLength = Size.Node_Length * count;

  // Execute resize
  if (flowMainNode) {
    mainNode.length = newLength;
    mainNode.width = Size.ConnectView_Width;
    flowMainNode.style.width = `${Size.ConnectView_Width}px`;
    flowMainNode.style.height = `${newLength}px`;
    flowMainNode.style.zIndex = "1";
    return;
  }

  // Reset
  const node = GetNodeByDataId(data.id);
  if (node) {
    node.style.width = `${Size.Node_Width}px`;
    node.style.height = `${Size.Node_Length}px`;
  }
  data.width = Size.Node_Width;
  data.length = Size.Node_Length;
};

export default ResizeConnectNode;
