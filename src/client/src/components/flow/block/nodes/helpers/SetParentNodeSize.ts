import { Size } from "../../../../../compLibrary/size";
import { Node } from "../../../../../models";

/**
 * Set the size of the ParentNode in BlockView. The size is dependent on other modules being open/closed.
 * @param secondaryNode
 * @param libOpen
 * @param explorerOpen
 * @param dispatch
 */
const SetParentNodeSize = (secondaryNode: Node, libOpen: boolean, explorerOpen: boolean) => {
  const width = secondaryNode ? window.innerWidth / 2.5 : window.innerWidth;
  const margin = SetMarginX(width, secondaryNode, libOpen, explorerOpen);

  return { width: width - margin, height: Size.BlockHeight - 80 };
};

export function SetMarginX(width: number, secondaryNode: Node, libOpen: boolean, explorerOpen: boolean) {
  const WIDE_SCREEN = 2200;
  const marginLarge = width > WIDE_SCREEN ? 85 : 0;
  const marginSmall = width > WIDE_SCREEN ? 50 : 0;

  if (!secondaryNode) {
    if (libOpen && explorerOpen) return Size.ModuleOpen * 2 - marginLarge;
    if (libOpen && !explorerOpen) return Size.ModuleOpen - 100;
    if (!libOpen && explorerOpen) return Size.ModuleOpen - marginLarge;
    if (!libOpen && !explorerOpen) return -250;
  }

  // if (libOpen && explorerOpen) return 85;
  // if (!libOpen && explorerOpen) return -40;
  // if (libOpen && !explorerOpen) return -330;
  // if (!libOpen && !explorerOpen) return 0;
}

export default SetParentNodeSize;
