import { Node } from "../../../../../../models";
import { GetNodeByDataId } from "../../../helpers";
import { setBlockNodeSize } from "../../../redux/actions";

/**
 * Function to update the ParentNode's size. The size changes if two nodes are displayed in BlockView.
 * @param node
 * @param secondaryNode
 * @param dispatch
 */
function SetParentNodeSize(node: Node, secondaryNode: Node, dispatch: any) {
  const margin = 500;
  const screenWidth = window.screen.width;
  // const screenHeight = window.screen.height;

  const width = secondaryNode ? screenWidth / 2 : screenWidth - margin;

  // Update the Flow parentNode
  const parentNode = GetNodeByDataId(node.id);
  if (parentNode) parentNode.style.width = `${width}px`;

  dispatch(setBlockNodeSize(width));
}

export default SetParentNodeSize;
