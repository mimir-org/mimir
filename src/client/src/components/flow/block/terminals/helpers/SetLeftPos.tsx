import { Position } from "react-flow-renderer";
import { SetTerminalXPos } from ".";
import { Size } from "../../../../../compLibrary";

/**
 * Component to set the left position of a terminal in BlockView
 * @param pos
 * @param electro
 * @param parent
 * @param inputCount
 * @param outputCount
 * @param splitView
 * @param nodeWidth
 * @param mainConnectNode
 * @returns a number used by the styled component HandleBox.
 */
const SetLeftPos = (
  pos: Position,
  electro: boolean,
  parent: boolean,
  inputCount: number,
  outputCount: number,
  splitView: boolean,
  nodeWidth: number,
  mainConnectNode: boolean
) => {
  if (!electro) {
    // TODO: Make scalable
    if (pos === Position.Left) return -16;
    if (pos === Position.Right && !parent && !mainConnectNode) return Size.Node_Width + 2;
    if (pos === Position.Right && !parent && mainConnectNode) return Size.ConnectView_Width + 2;
    if (pos === Position.Right && parent && !splitView) return Size.BlockView_Width + 5;
    if (pos === Position.Right && parent && splitView) return Size.SplitView_Width;
  }
  if (pos === Position.Top) return SetTerminalXPos(inputCount, parent, nodeWidth, mainConnectNode);
  if (pos === Position.Bottom) return SetTerminalXPos(outputCount, parent, nodeWidth, mainConnectNode);
};

export default SetLeftPos;
