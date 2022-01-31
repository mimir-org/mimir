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
const SetParentNodeSize = (secondaryNode: boolean, libOpen: boolean, explorerOpen: boolean, dispatch: Dispatch) => {
  const screenWidth = secondaryNode ? window.innerWidth / 2.4 : window.innerWidth;
  const marginX = SetMarginX(secondaryNode, libOpen, explorerOpen);
  let width = screenWidth - marginX;

  if (width > Size.BlockMaxWidth) width = Size.BlockMaxWidth;
  dispatch(setBlockNodeSize({ width, height: window.innerHeight }));
};

export function SetMarginX(secondaryNode: boolean, libOpen: boolean, explorerOpen: boolean) {
  if (libOpen && explorerOpen) return secondaryNode ? 170 : Size.ModuleOpen + 250;
  if ((libOpen && !explorerOpen) || (!libOpen && explorerOpen)) return secondaryNode ? 40 : Size.ModuleOpen - 60;
  if (!libOpen && !explorerOpen) return secondaryNode ? -120 : -40;
}

export default SetParentNodeSize;
