import { Position } from "react-flow-renderer";
import { Size } from "../../../../../compLibrary";
import { SetTerminalYPos } from "./";

/**
 * Component to set the top position of a terminal in BlockView
 * @param pos
 * @param electro
 * @param isParent
 * @param inputCount
 * @param outputCount
 * @param nodeHeight
 * @returns a number used by the styled component HandleBox.
 */
const SetTopPos = (
  pos: Position,
  electro: boolean,
  isParent: boolean,
  inputCount: number,
  outputCount: number,
  nodeHeight: number
) => {
  if (!electro) {
    if (pos === Position.Left) return SetTerminalYPos(inputCount, isParent, nodeHeight);
    if (pos === Position.Right) return SetTerminalYPos(outputCount, isParent, nodeHeight);
  }
  if (pos === Position.Top) return -15;
  if (pos === Position.Bottom && !isParent) return Size.Node_Length;
  if (pos === Position.Bottom && isParent) return 605;
};

export default SetTopPos;
