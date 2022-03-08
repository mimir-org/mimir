import { Dispatch } from "redux";
import { Size } from "../../../../../compLibrary/size";
import { setBlockNodeSize } from "../../redux/blockNodeSizeSlice";

/**
 * Set the size of the ParentNode in BlockView. The size is dependent on other modules being open/closed.
 * @param secondaryNode
 * @param libOpen
 * @param explorerOpen
 * @param dispatch
 */
export const SetParentNodeWidth = (secondaryNode: boolean, libOpen: boolean, explorerOpen: boolean, dispatch: Dispatch) => {
  const screenWidth = secondaryNode ? window.innerWidth / 2.4 : window.innerWidth - Size.BLOCK_MARGIN_X;
  const marginX = SetParentBlockMarginRight(secondaryNode, libOpen, explorerOpen);
  let width = screenWidth - marginX;

  if (width > Size.BLOCK_PARENT_MAX_WIDTH) width = Size.BLOCK_PARENT_MAX_WIDTH;
  dispatch(setBlockNodeSize({ width, height: Size.BLOCK_PARENT_HEIGHT }));
  return width;
};

export function SetParentBlockMarginRight(secondaryNode: boolean, libOpen: boolean, explorerOpen: boolean) {
  if (libOpen && explorerOpen) return secondaryNode ? 330 : 680;
  if ((libOpen && !explorerOpen) || (!libOpen && explorerOpen)) return secondaryNode ? 150 : 330;
  if (!libOpen && !explorerOpen) return -30;
}
