import { Position } from "react-flow-renderer";
import { SetTerminalXPos } from ".";
import { Connector } from "../../../../../models";
import { IsInputTerminal, IsLocationTerminal, IsPartOf, IsProductTerminal } from "../../../helpers";

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
  const marginX = 17;
  const marginXSmall = 5;

  if (!electro) {
    if (IsPartOf(conn)) return nodeWidth / 2;
    if (pos === Position.Right) return nodeWidth + marginXSmall;
    return -marginX;
  }

  if (IsPartOf(conn)) {
    if (IsInputTerminal(conn)) return -marginX;
    return nodeWidth + marginXSmall;
  }

  if (IsProductTerminal(conn) || IsLocationTerminal(conn)) return nodeWidth / 2 - marginXSmall;
  return SetTerminalXPos(order, parent, nodeWidth);
};

export default SetLeftPos;
