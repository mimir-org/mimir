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
 * @returns a number used by the styled component HandleBox.
 */
const SetLeftPos = (conn: Connector, pos: Position, electro: boolean, parent: boolean, order: number, nodeWidth: number) => {
  if (electro) {
    if (IsProductTerminal(conn) || IsLocationTerminal(conn)) return 80;
    return SetTerminalXPos(order, parent, nodeWidth);
  }

  if (pos === Position.Left) return -17;
  if (pos === Position.Right && !parent) return Size.Node_Width + 3;
  if (pos === Position.Right && parent) return Size.BlockView_Width + 5;
};

export default SetLeftPos;
