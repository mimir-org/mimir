import { Position } from "react-flow-renderer";
import { Size } from "../../../../../compLibrary";
import { SetTerminalYPos } from "./";

/**
 * Component to set the top position of a terminal in BlockView
 * @param pos
 * @param electro
 * @param parent
 * @param inputCount
 * @param outputCount
 * @param nodeHeight
 * @param mainConnectNode
 * @returns a number used by the styled component HandleBox.
 */
const SetTopPos = (
  pos: Position,
  electro: boolean,
  parent: boolean,
  inputCount: number,
  outputCount: number,
  nodeHeight: number,
  mainConnectNode: boolean
) => {
  if (!electro) {
    if (pos === Position.Left) return SetTerminalYPos(inputCount, parent, nodeHeight, mainConnectNode);
    if (pos === Position.Right) return SetTerminalYPos(outputCount, parent, nodeHeight, mainConnectNode);
  }
  if (pos === Position.Top) return -18;
  if (pos === Position.Bottom && !parent && !mainConnectNode) return Size.Node_Length + 3;
  if (pos === Position.Bottom && !parent && mainConnectNode) return nodeHeight + 3;
  if (pos === Position.Bottom && parent) return 605;
};

export default SetTopPos;
