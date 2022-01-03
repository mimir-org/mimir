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
  const marginX = parent ? 20 : 22;
  const marginXSmall = 3;

  if (offPage) return SetOffPageTerminalXPos(position);
  if (electro) return SetElectroTerminalXPos(conn, order, parent, nodeWidth, marginXSmall, marginX);

  if (IsPartOf(conn)) return nodeWidth / 2;
  if (position === Position.Right && !parent) return nodeWidth - marginXSmall;
  if (position === Position.Right && parent) return nodeWidth;
  return -marginX;
};

function SetOffPageTerminalXPos(position: Position) {
  if (position === Position.Right) return 33;
  if (position === Position.Left) return -17;
}

function SetElectroTerminalXPos(
  conn: Connector,
  order: number,
  isParent: boolean,
  nodeWidth: number,
  marginXSmall: number,
  marginX: number
) {
  if (IsPartOf(conn)) {
    if (IsInputTerminal(conn)) return -marginX;
    return nodeWidth + marginXSmall;
  }

  if (IsProductTerminal(conn) || IsLocationTerminal(conn)) return nodeWidth / 2 - marginXSmall;
  return CalculateX(order, isParent, nodeWidth);
}

/**
 * Function to calculate a terminal's X position. Terminals are positioned middle-out.
 * @param count the count of input or output terminals for a node.
 * @param isParent+
 * @param nodeWidth
 * @returns a number used by the styled component HandleBox.
 */
function CalculateX(count: number, isParent: boolean, nodeWith: number) {
  const interval = isParent ? 35 : Size.Terminals_Interval; // Default horizontal distance between each terminal
  const base = nodeWith / 2 - 12; // Middle position

  // Even-numbered terminals ordered left
  if (count % 2 === 0) return base - interval * (count / 2);

  // Odd-numbered terminals ordered right
  if (count % 2 !== 0) return base + interval * Math.floor(count / 2) + interval;
}
export default SetTerminalXPos;
