import { Node } from "../../../../../models";
import { GetNodeByDataId } from "../../helpers";
import { setBlockNodeSize } from "../../redux/actions";

/**
 * Function to update the ParentNode's size. The size changes if two nodes are displayed in BlockView.
 * The size is based on the client's screen size.
 * @param node
 * @param secondaryNode
 * @param dispatch
 */
function SetParentNodeSize(node: Node, secondaryNode: Node, dispatch: any) {
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const marginX = screenWidth / 5;
  const marginY = 250;
  const width = secondaryNode ? screenWidth - marginX * 3 : screenWidth - marginX;
  const height = screenHeight - marginY;

  // Update the Flow parentNode
  const parentNode = GetNodeByDataId(node?.id);
  if (parentNode) {
    parentNode.style.width = `${width}px`;
    parentNode.style.height = `${height}px`;
  }

  dispatch(setBlockNodeSize(width, height));
}

export default SetParentNodeSize;
