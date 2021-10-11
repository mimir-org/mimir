import { Position } from "react-flow-renderer";
import { SetTerminalYPos } from "./";

/**
 * Component to set the top position of a terminal in BlockView
 * @param pos
 * @param electro
 * @param isParent
 * @param inputCount
 * @param outputCount
 * @returns a string used by the styled component HandleBox.
 */
const SetTopPos = (pos: Position, electro: boolean, isParent: boolean, inputCount: number, outputCount: number) => {
  if (!electro) {
    if (pos === Position.Left) return SetTerminalYPos(inputCount, isParent) + "%";
    if (pos === Position.Right) return SetTerminalYPos(outputCount, isParent) + "%";
  }
  if (pos === Position.Top) return "-15px";
  if (pos === Position.Bottom) return "80px";
};

export default SetTopPos;
