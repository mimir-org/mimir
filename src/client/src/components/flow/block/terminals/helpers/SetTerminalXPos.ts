import { Position } from "react-flow-renderer";
import { Size } from "../../../../../compLibrary/size";
import { Connector } from "../../../../../models";
import { IsInputTerminal, IsLocationTerminal, IsPartOf, IsProductTerminal } from "../../../helpers";

/**
 * Component to set the X position of a terminal in BlockView.
 * @param conn
 * @param position
 * @param electro
 * @param parent
 * @param order
 * @param nodeWidth
 * @returns a number used by the styled component HandleBox.
 */
const SetTerminalXPos = (
  conn: Connector,
  position: Position,
  electro: boolean,
  offPage: boolean,
  parent: boolean,
  order: number,
  nodeWidth: number
) => {
  const marginX = 17;
  const marginXSmall = 5;

  if (offPage) {
    if (position === Position.Right) return 30;
    return -12;
  }

  if (!electro) {
    if (IsPartOf(conn)) return nodeWidth / 2;
    if (position === Position.Right) return nodeWidth + marginXSmall;
    return -marginX;
  }

  if (IsPartOf(conn)) {
    if (IsInputTerminal(conn)) return -marginX;
    return nodeWidth + marginXSmall;
  }

  if (IsProductTerminal(conn) || IsLocationTerminal(conn)) return nodeWidth / 2 - marginXSmall;
  return CalculateX(order, parent, nodeWidth);
};

export default SetTerminalXPos;

/**
 * Function to calculate a terminal's X position. Terminals are positioned middle-out.
 * @param count the count of input or output terminals for a node.
 * @param parent
 * @param nodeWidth
 * @returns a number used by the styled component HandleBox.
 */
function CalculateX(count: number, parent: boolean, nodeWith: number) {
  const interval = parent ? 35 : Size.Terminals_Interval; // Default horizontal distance between each terminal
  const base = nodeWith / 2 - 8; // Middle position

  // Even-numbered terminals ordered left
  if (count % 2 === 0) return base - interval * (count / 2);

  // Odd-numbered terminals ordered right
  if (count % 2 !== 0) return base + interval * Math.floor(count / 2) + interval;
}
