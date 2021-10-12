import { Position } from "react-flow-renderer";
import { SetTerminalXPos } from ".";

/**
 * Component to set the left position of a terminal in BlockView
 * @param pos
 * @param electro
 * @param isParent
 * @param inputCount
 * @param outputCount
 * @returns a string used by the styled component HandleBox.
 */
const SetLeftPos = (pos: Position, electro: boolean, isParent: boolean, inputCount: number, outputCount: number) => {
  if (!electro) {
    if (pos === Position.Left) return "-16px";
    if (pos === Position.Right && !isParent) return "130px";
    if (pos === Position.Right && isParent) return "950px"; // TODO: Make scalable
  }
  if (pos === Position.Top) return SetTerminalXPos(inputCount, isParent) + "%";
  if (pos === Position.Bottom) return SetTerminalXPos(outputCount, isParent) + "%";
};

export default SetLeftPos;
