import { Node } from "../../../../../models";
import { GetNodeByDataId } from "../../helpers";
import { setBlockNodeSize } from "../../redux/actions";

/**
 * Function to update the Product ParentNode's size.
 * The size is based on the client's screen size.
 * @param node
 * @param dispatch
 */
function SetParentProductNodeSize(node: Node, dispatch: any) {
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const marginY = 180;
  const marginX = 150;

  const width = screenWidth - marginX;
  const length = screenHeight - marginY;

  // Update the Flow parentNode
  const parentNode = GetNodeByDataId(node?.id);
  if (parentNode) {
    parentNode.style.width = `${width}px`;
    parentNode.style.height = `${length}px`;
  }

  dispatch(setBlockNodeSize(width, length));
}

export default SetParentProductNodeSize;
