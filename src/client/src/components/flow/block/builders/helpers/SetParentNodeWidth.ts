import { Dispatch } from "redux";
import { Size } from "../../../../../compLibrary/size/Size";
import { setBlockNodeSize } from "../../redux/blockNodeSizeSlice";

/**
 * Set the size of the ParentNode in BlockView. The size is dependent on other modules being open/closed.
 * @param secondaryNode
 * @param dispatch
 */
export const SetParentNodeWidth = (secondaryNode: boolean, dispatch: Dispatch) => {
  let width = !secondaryNode ? window.innerWidth - Size.BLOCK_MARGIN_X : window.innerWidth / Size.BLOCK_SPLITVIEW_DIVISOR;
  if (width > Size.BLOCK_PARENT_MAX_WIDTH) width = Size.BLOCK_PARENT_MAX_WIDTH;

  dispatch(setBlockNodeSize({ width, height: Size.BLOCK_PARENT_HEIGHT }));
  return width;
};
