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
 * @param nodeLength
 * @returns a number used by the styled component HandleBox.
 */
const SetTopPos = (conn: Connector, pos: Position, electro: boolean, parent: boolean, order: number, nodeLength: number) => {
  const marginY = 17;
  const marginYSmall = 5;

  if (electro) {
    if (IsPartOf(conn)) return nodeLength / 2 - marginYSmall;
    if (pos === Position.Top) return -marginY;
    return nodeLength + marginYSmall;
  }

  if (IsPartOf(conn)) {
    if (pos === Position.Top) return -marginY;
    return nodeLength;
  }

  if (IsProductTerminal(conn) || IsLocationTerminal(conn)) return nodeLength / 2 - marginYSmall;
  return SetTerminalYPos(order, parent, nodeLength);
};

export default SetTopPos;
