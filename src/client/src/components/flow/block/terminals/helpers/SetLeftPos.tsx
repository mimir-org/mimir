import { Position } from "react-flow-renderer";
import { SetTerminalXPos } from ".";
import { Size } from "../../../../../compLibrary";
import { Connector } from "../../../../../models";
import { IsLocationTerminal, IsProductTerminal } from "../../../helpers";

/**
 * Component to set the left position of a terminal in BlockView
 * @param conn
 * @param pos
 * @param electro
 * @param parent
 * @param order
 * @param nodeWidth
 * @param mainConnectNode
 * @returns a number used by the styled component HandleBox.
 */
const SetLeftPos = (
  conn: Connector,
  pos: Position,
  electro: boolean,
  parent: boolean,
  order: number,
  nodeWidth: number,
  mainConnectNode: boolean
) => {
  if (electro) {
    if (IsProductTerminal(conn) || IsLocationTerminal(conn)) return 80;
    return SetTerminalXPos(order, parent, nodeWidth, mainConnectNode);
  }

  if (pos === Position.Left) return -17;
  if (pos === Position.Right && !parent && !mainConnectNode) return Size.Node_Width + 3;
  if (pos === Position.Right && !parent && mainConnectNode) return Size.ConnectView_Width + 3;
  if (pos === Position.Right && parent) return Size.BlockView_Width + 5;
};

export default SetLeftPos;
