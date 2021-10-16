import { Size } from "../../../../../compLibrary";

/**
 * Method to calculate a terminal's X position in BlockView.
 * @param count the count of input or output terminals for a node.
 * @param isParent
 * @param nodeWidth
 * @returns a number used by the styled component HandleBox.
 */
const SetTerminalXPos = (count: number, isParent: boolean, nodeWith: number) => {
  const base = nodeWith / 2 - 8; // Middle position
  const interval = isParent ? 50 : Size.Terminals_Interval; // Default horizontal distance between each terminal

  if (count === 0 || count === 1) return base;

  // Even-numbered terminals ordered left
  if (count % 2 === 0) return base - interval * (count / 2);

  // Odd-numbered terminals ordered right
  if (count % 2 !== 0) return base + interval * Math.floor(count / 2);
};

export default SetTerminalXPos;
