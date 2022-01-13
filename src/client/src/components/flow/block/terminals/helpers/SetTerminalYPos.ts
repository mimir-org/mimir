import { Position } from "react-flow-renderer";
import { Size } from "../../../../../compLibrary/size";
import { Connector } from "../../../../../models";
import { IsLocationTerminal, IsPartOf, IsProductTerminal } from "../../../helpers";

/**
 * Component to set the Y position of a terminal in BlockView.
 * @param conn
 * @param position
 * @param electro
 * @param isParent
 * @param order
 * @param nodeHeight
 * @returns a number used by the styled component HandleBox.
 */
const SetTerminalYPos = (
  conn: Connector,
  position: Position,
  electro: boolean,
  isParent: boolean,
  order: number,
  nodeHeight: number
) => {
  const marginY = isParent ? 20 : 22;
  const marginYSmall = 3;

  if (electro) return SetElectroTerminalXPos(conn, position, nodeHeight, marginY, marginYSmall, isParent);

  if (IsPartOf(conn)) {
    if (position === Position.Top) return -marginY;
    return nodeHeight;
  }

  if (IsProductTerminal(conn) || IsLocationTerminal(conn)) return nodeHeight / 2 - marginYSmall;
  return CalculateY(order, isParent, nodeHeight);
};

function SetElectroTerminalXPos(
  conn: Connector,
  position: Position,
  nodeHeight: number,
  marginY: number,
  marginYSmall: number,
  isParent: boolean
) {
  if (IsPartOf(conn)) return nodeHeight / 2 - marginYSmall;
  if (position === Position.Top && !isParent) return -marginY;
  if (position === Position.Top && isParent) return -marginY;

  if (position === Position.Bottom && !isParent) return nodeHeight - marginYSmall;
  if (position === Position.Bottom && isParent) return nodeHeight;

  // return nodeHeight - marginYSmall;
}

/**
 * Function to calculate a terminal's Y position. Terminals are positioned middle-out.
 * @param count the count of input or output terminals for a node.
 * @param isParent
 * @param nodeHeight
 * @returns a number used by the styled component HandleBox.
 */
function CalculateY(count: number, isParent: boolean, nodeHeight: number) {
  if (count === undefined) count = 0;

  const interval = isParent ? 30 : Size.Terminals_Interval; // Default vertical distance between each terminal
  const base = isParent ? (nodeHeight - 40) / 2 : nodeHeight / 2 - 12; // Middle Position

  // Even-numbered terminals stacked upwards
  if (count % 2 === 0) return base - interval * (count / 2);

  // Odd-numbered terminals stacked downwards
  if (count % 2 !== 0) return base + interval * Math.floor(count / 2) + interval;
}

export default SetTerminalYPos;
