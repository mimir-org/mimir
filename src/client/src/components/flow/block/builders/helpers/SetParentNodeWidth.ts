import { Dispatch } from "redux";
import { Size } from "../../../../../compLibrary/size";
import { setBlockNodeSize } from "../../redux/blockNodeSizeSlice";

/**
 * Set the size of the ParentNode in BlockView. The size is dependent on other modules being open/closed.
 * @param secondaryNode
 * @param dispatch
 */
export const SetParentNodeWidth = (secondaryNode: boolean, dispatch: Dispatch) => {
  const screenWidth = secondaryNode ? window.innerWidth / Size.BLOCK_SPLITVIEW_DIVISOR : window.innerWidth - Size.BLOCK_MARGIN_X;
  const marginX = SetParentBlockMarginRight(secondaryNode);
  let width = screenWidth - marginX;

  if (width > Size.BLOCK_PARENT_MAX_WIDTH) width = Size.BLOCK_PARENT_MAX_WIDTH;
  dispatch(setBlockNodeSize({ width, height: Size.BLOCK_PARENT_HEIGHT }));
  return width;
};

export function SetParentBlockMarginRight(secondaryNode: boolean) {
  return -30;
}
