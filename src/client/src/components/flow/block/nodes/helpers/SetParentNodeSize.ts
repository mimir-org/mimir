import { Size } from "../../../../../compLibrary/size";
import { Node } from "../../../../../models";

/**
 * Set the size of the ParentNode in BlockView. The size is dependent on other modules being open/closed.
 * @param setWidth
 * @param secondaryNode
 * @param libOpen
 * @param explorerOpen
 */
const SetParentNodeSize = (setWidth: any, secondaryNode: Node, libOpen: boolean, explorerOpen: boolean) => {
  const width = secondaryNode ? window.innerWidth / 2.5 : window.innerWidth;
  const margin = SetMarginX(width, secondaryNode, libOpen, explorerOpen);
  setWidth(width - margin);
  console.log("reidar");
};

export function SetMarginX(width: number, secondaryNode: Node, libOpen: boolean, explorerOpen: boolean) {
  const WIDE_SCREEN = 2200;
  const marginLarge = width > WIDE_SCREEN ? 95 : 0;
  // const marginSmall = width > WIDE_SCREEN ? 50 : 0;

  if (!secondaryNode) {
    if (libOpen && explorerOpen) return Size.ModuleOpen * 2 - marginLarge;
    if (libOpen && !explorerOpen) return Size.ModuleOpen - 100;
    if (!libOpen && explorerOpen) return Size.ModuleOpen - marginLarge;
    if (!libOpen && !explorerOpen) return -50;
  }

  // if (libOpen && explorerOpen) return 85;
  // if (!libOpen && explorerOpen) return -40;
  // if (libOpen && !explorerOpen) return -330;
  // if (!libOpen && !explorerOpen) return 0;
}

export default SetParentNodeSize;
