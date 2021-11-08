import { Position } from "react-flow-renderer";
import { SetTerminalXPos } from ".";
import { Connector } from "../../../../../models";
import { IsLocationTerminal, IsPartOf, IsProductTerminal } from "../../../helpers";

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
  if (IsPartOf(conn)) return nodeWidth / 2;
  if (pos === Position.Left) return -17;
  if (pos === Position.Right && !parent) return nodeWidth + 3;
  if (pos === Position.Right && parent) return nodeWidth + 5;
};

export default SetLeftPos;
