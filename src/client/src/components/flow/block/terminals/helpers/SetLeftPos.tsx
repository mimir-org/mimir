import { Position } from "react-flow-renderer";
import { SetTerminalXPos } from ".";
import { Size } from "../../../../../compLibrary";

/**
 * Component to set the left position of a terminal in BlockView
 * @param pos
 * @param electro
 * @param parent
 * @param order
 * @param splitView
 * @param nodeWidth
 * @param mainConnectNode
 * @returns a number used by the styled component HandleBox.
 */
const SetLeftPos = (
  pos: Position,
  electro: boolean,
  parent: boolean,
  order: number,
  splitView: boolean,
  nodeWidth: number,
  mainConnectNode: boolean
) => {
  if (electro) return SetTerminalXPos(order, parent, nodeWidth, mainConnectNode);

  if (pos === Position.Left) return -17;
  if (pos === Position.Right && !parent && !mainConnectNode) return Size.Node_Width + 3;
  if (pos === Position.Right && !parent && mainConnectNode) return Size.ConnectView_Width + 3;
  if (pos === Position.Right && parent && !splitView) return Size.BlockView_Width + 5;
  if (pos === Position.Right && parent && splitView) return Size.SplitView_Width + 5;
};

export default SetLeftPos;
