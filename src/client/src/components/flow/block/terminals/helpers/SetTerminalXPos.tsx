import { Size } from "../../../../../compLibrary";

/**
 * Method to calculate a terminal's X position in BlockView.
 * @param count the count of input or output terminals for a node.
 * @param parent
 * @param nodeWidth
 * @param mainConnectNode
 * @returns a number used by the styled component HandleBox.
 */
const SetTerminalXPos = (count: number, parent: boolean, nodeWith: number, mainConnectNode: boolean) => {
  const interval = parent ? 50 : Size.Terminals_Interval; // Default horizontal distance between each terminal
  let base = nodeWith / 2 - 8; // Middle position
  if (mainConnectNode) base = 220;

  if (count === 0 || count === 1) return base;

  // Even-numbered terminals ordered left
  if (count % 2 === 0) return base - interval * (count / 2);

  // Odd-numbered terminals ordered right
  if (count % 2 !== 0) return base + interval * Math.floor(count / 2);
};

export default SetTerminalXPos;
