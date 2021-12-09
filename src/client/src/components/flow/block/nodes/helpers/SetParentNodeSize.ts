import { Size } from "../../../../../compLibrary/size";
import { Node } from "../../../../../models";
import { setBlockNodeSize } from "../../redux/actions";

/**
 * Set the size of the ParentNode in BlockView. The size is dependent on other modules being open/closed.
 * @param secondaryNode
 * @param libOpen
 * @param explorerOpen
 * @param dispatch
 */
const SetParentNodeSize = (secondaryNode: Node, libOpen: boolean, explorerOpen: boolean, dispatch: any) => {
  const width = secondaryNode ? window.innerWidth / 2 : window.innerWidth;
  const margin = SetMarginX(width, secondaryNode, libOpen, explorerOpen);

  dispatch(setBlockNodeSize(width - margin, Size.BlockHeight));
};

export function SetMarginX(width: number, secondaryNode: Node, libOpen: boolean, explorerOpen: boolean) {
  const WIDE_SCREEN = 2200;
  const marginLarge = width > WIDE_SCREEN ? 85 : 0;
  const marginSmall = width > WIDE_SCREEN ? 50 : 0;

  if (!secondaryNode) {
    if (libOpen && explorerOpen) return Size.ModuleOpen * 2 - marginLarge;
    if (libOpen && !explorerOpen) return Size.ModuleOpen - marginLarge;
    if (!libOpen && explorerOpen) return Size.ModuleOpen - marginLarge;
    return -marginSmall;
  }
  return 0;
}

export default SetParentNodeSize;
