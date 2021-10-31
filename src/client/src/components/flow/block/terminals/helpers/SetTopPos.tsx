import { Position } from "react-flow-renderer";
import { Connector } from "../../../../../models";
import { IsProductTerminal, IsLocationTerminal } from "../../../helpers";
import { SetTerminalYPos } from "./";

/**
 * Component to set the top position of a terminal in BlockView
 * @param conn
 * @param pos
 * @param electro
 * @param parent
 * @param order
 * @param nodeLength
 * @returns a number used by the styled component HandleBox.
 */
const SetTopPos = (conn: Connector, pos: Position, electro: boolean, parent: boolean, order: number, nodeLength: number) => {
  if (!electro) {
    if (IsProductTerminal(conn) || IsLocationTerminal(conn)) return 50;
    return SetTerminalYPos(order, parent, nodeLength);
  }

  if (pos === Position.Top && !parent) return -17;
  if (pos === Position.Top && parent) return -15;
  if (pos === Position.Bottom) return nodeLength + 3;
};

export default SetTopPos;
