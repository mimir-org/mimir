import { Position } from "react-flow-renderer";
import { SetTerminalXPos } from ".";
import { Size } from "../../../../../compLibrary";

/**
 * Component to set the left position of a terminal in BlockView
 * @param pos
 * @param electro
 * @param isParent
 * @param inputCount
 * @param outputCount
 * @returns a number used by the styled component HandleBox.
 */
const SetLeftPos = (
  pos: Position,
  electro: boolean,
  isParent: boolean,
  inputCount: number,
  outputCount: number,
  splitView: boolean,
  nodeWidth: number
) => {
  if (!electro) {
    if (pos === Position.Left) return -16;
    if (pos === Position.Right && !isParent) return Size.Node_Width + 2;
    if (pos === Position.Right && isParent && !splitView) return Size.BlockView_Width; // TODO: Make scalable
    if (pos === Position.Right && isParent && splitView) return Size.SplitView_Width;
  }
  if (pos === Position.Top) return SetTerminalXPos(inputCount, isParent, nodeWidth);
  if (pos === Position.Bottom) return SetTerminalXPos(outputCount, isParent, nodeWidth);
};

export default SetLeftPos;
