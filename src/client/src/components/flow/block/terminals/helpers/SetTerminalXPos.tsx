/**
 * Method to calculate a terminal's X position in BlockView.
 * @param count the count of input or output terminals for a node.
 * @returns a number used by the styled component HandleBox.
 */
const SetTerminalXPos = (count: number, isParent: boolean) => {
  const base = 45; // Middle position
  const interval = isParent ? 3 : 22; // Default horizontal distance between each terminal

  if (count === 0 || count === 1) return base;

  // Even-numbered terminals stacked left
  if (count % 2 === 0) return base - interval * (count / 2);

  // Odd-numbered terminals stacked right
  if (count % 2 !== 0) return base + interval * Math.floor(count / 2);
};

export default SetTerminalXPos;
