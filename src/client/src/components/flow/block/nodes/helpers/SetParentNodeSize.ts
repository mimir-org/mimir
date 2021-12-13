import { Size } from "../../../../../compLibrary/size";

/**
 * Set the size of the ParentNode in BlockView. The size is dependent on other modules being open/closed.
 * @param setWidth
 * @param setHeight
 * @param secondaryNode
 * @param libOpen
 * @param explorerOpen
 */
const SetParentNodeSize = (setWidth: any, setHeight: any, secondaryNode: boolean, libOpen: boolean, explorerOpen: boolean) => {
  const screenWidth = secondaryNode ? window.innerWidth / 2.3 : window.innerWidth;
  const marginX = SetMarginX(secondaryNode, libOpen, explorerOpen);
  const marginY = 80;
  let width = screenWidth - marginX;

  if (width > Size.BlockMaxWidth) width = Size.BlockMaxWidth;

  setWidth(width);
  setHeight(window.innerHeight - marginY);
};

export function SetMarginX(secondaryNode: boolean, libOpen: boolean, explorerOpen: boolean) {
  if (libOpen && explorerOpen) return secondaryNode ? 170 : Size.ModuleOpen + 200;
  if ((libOpen && !explorerOpen) || (!libOpen && explorerOpen)) return secondaryNode ? 0 : Size.ModuleOpen - 100;
  if (!libOpen && !explorerOpen) return secondaryNode ? -130 : -60;
}

export default SetParentNodeSize;
