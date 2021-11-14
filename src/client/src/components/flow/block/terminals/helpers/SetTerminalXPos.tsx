import { Size } from "../../../../../compLibrary/size";

/**
 * Method to calculate a terminal's X position in BlockView. Terminals are positioned middle-out.
 * @param count the count of input or output terminals for a node.
 * @param parent
 * @param nodeWidth
 * @returns a number used by the styled component HandleBox.
 */
const SetTerminalXPos = (count: number, parent: boolean, nodeWith: number) => {
  const interval = parent ? 35 : Size.Terminals_Interval; // Default horizontal distance between each terminal
  const base = nodeWith / 2 - 8; // Middle position

  // Even-numbered terminals ordered left
  if (count % 2 === 0) return base - interval * (count / 2);

  // Odd-numbered terminals ordered right
  if (count % 2 !== 0) return base + interval * Math.floor(count / 2) + interval;
};

export default SetTerminalXPos;
