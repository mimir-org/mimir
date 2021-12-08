import { Position } from "react-flow-renderer";
import { Size } from "../../../../../compLibrary/size";
import { Connector } from "../../../../../models";
import { IsProductTerminal, IsLocationTerminal, IsPartOf } from "../../../helpers";

/**
 * Component to set the Y position of a terminal in BlockView.
 * @param conn
 * @param position
 * @param electro
 * @param parent
 * @param order
 * @param nodeHeight
 * @returns a number used by the styled component HandleBox.
 */
const SetTerminalYPos = (
  conn: Connector,
  position: Position,
  electro: boolean,
  parent: boolean,
  order: number,
  nodeHeight: number
) => {
  const marginY = parent ? 20 : 22;
  const marginYSmall = 3;

  if (electro) {
    if (IsPartOf(conn)) return nodeHeight / 2 - marginYSmall;
    if (position === Position.Top) return -marginY;
    return nodeHeight - marginYSmall;
  }

  if (IsPartOf(conn)) {
    if (position === Position.Top) return -marginY;
    return nodeHeight;
  }

  if (IsProductTerminal(conn) || IsLocationTerminal(conn)) return nodeHeight / 2 - marginYSmall;
  return CalculateY(order, parent, nodeHeight);
};

export default SetTerminalYPos;

/**
 * Function to calculate a terminal's Y position. Terminals are positioned middle-out.
 * @param count the count of input or output terminals for a node.
 * @param parent
 * @param nodeHeight
 * @returns a number used by the styled component HandleBox.
 */
function CalculateY(count: number, parent: boolean, nodeHeight: number) {
  if (count === undefined) count = 0;

  const interval = parent ? 30 : Size.Terminals_Interval; // Default vertical distance between each terminal
  const base = parent ? 290 : nodeHeight / 2 - 7; // Middle Position

  // Even-numbered terminals stacked upwards
  if (count % 2 === 0) return base - interval * (count / 2);

  // Odd-numbered terminals stacked downwards
  if (count % 2 !== 0) return base + interval * Math.floor(count / 2) + interval;
}
