import { Size } from "../../../../../compLibrary/size/Size";
import { Position } from "../../../../../models/project";

/**
 * Function to force a child node to fit within the parent block in BlockView.
 * @param nodePos
 * @param libOpen
 * @param explorerOpen
 * @param splitView
 * @param isProduct
 * @returns an updated position, containing X and Y values.
 */

const SetNodePos = (nodePos: Position, libOpen: boolean, explorerOpen: boolean, splitView: boolean, isProduct: boolean) => {
  const margin = 30;
  const marginLarge = 80;
  const width = splitView ? window.innerWidth / Size.BLOCK_SPLITVIEW_DIVISOR : window.innerWidth - Size.BLOCK_MARGIN_X;

  const yMin = 30;
  const yMax = window.innerHeight - 180;
  const xMin = SetXMin(explorerOpen, marginLarge, isProduct);
  const xMax = splitView
    ? SetSplitViewXMax(libOpen, explorerOpen, width, marginLarge)
    : SetXMax(libOpen, explorerOpen, width, isProduct);

  let nodeX = nodePos.x;
  let nodeY = nodePos.y;

  if (nodeX < xMin) nodeX = xMin + margin;
  if (nodeX > xMax) nodeX = xMax - margin;
  if (nodeY < yMin) nodeY = yMin + 20;
  if (nodeY > yMax) nodeY = yMax - margin * 3.5;

  return { x: nodeX, y: nodeY };
};

function SetXMax(libOpen: boolean, explorerOpen: boolean, width: number, isProduct: boolean) {
  if (isProduct) {
    const productWidth = Size.BLOCK_PRODUCT_WIDTH;
    return productWidth - 60;
  }
  if ((libOpen && explorerOpen) || (libOpen && !explorerOpen)) return width - Size.MODULE_OPEN;
  if ((!libOpen && !explorerOpen) || (!libOpen && explorerOpen)) return width - 30;
}

function SetSplitViewXMax(libOpen: boolean, explorerOpen: boolean, width: number, marginLarge: number) {
  if (libOpen && !explorerOpen) return width - marginLarge;
  if (!libOpen && explorerOpen) return width + 150;
  if ((libOpen && explorerOpen) || (!libOpen && !explorerOpen)) return width - 30;
}

function SetXMin(explorerOpen: boolean, marginLarge: number, isProduct) {
  if (isProduct) return marginLarge;
  if (explorerOpen) return Size.MODULE_OPEN + 30;
  return marginLarge;
}

export default SetNodePos;
