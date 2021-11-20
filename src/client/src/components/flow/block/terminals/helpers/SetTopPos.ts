import { Position } from "react-flow-renderer";
import { Connector } from "../../../../../models";
import { IsProductTerminal, IsLocationTerminal, IsPartOf } from "../../../helpers";
import { SetTerminalYPos } from "./";

/**
 * Component to set the top position of a terminal in BlockView
 * @param conn
 * @param pos
 * @param electro
 * @param parent
 * @param order
 * @param nodeHeight
 * @returns a number used by the styled component HandleBox.
 */
const SetTopPos = (conn: Connector, pos: Position, electro: boolean, parent: boolean, order: number, nodeHeight: number) => {
  const marginY = 17;
  const marginYSmall = 5;

  if (electro) {
    if (IsPartOf(conn)) return nodeHeight / 2 - marginYSmall;
    if (pos === Position.Top) return -marginY;
    return nodeHeight + marginYSmall;
  }

  if (IsPartOf(conn)) {
    if (pos === Position.Top) return -marginY;
    return nodeHeight;
  }

  if (IsProductTerminal(conn) || IsLocationTerminal(conn)) return nodeHeight / 2 - marginYSmall;
  return SetTerminalYPos(order, parent, nodeHeight);
};

export default SetTopPos;
