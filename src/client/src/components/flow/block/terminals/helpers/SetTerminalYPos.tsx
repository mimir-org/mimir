/**
 * Method to calculate a terminal's Y position in BlockView. Terminals are positioned middle-out.
 * @param count the count of input or output terminals for a node.
 * @param parent
 * @param nodeHeight
 * @returns a number used by the styled component HandleBox.
 */
const SetTerminalYPos = (count: number, parent: boolean, nodeHeight: number) => {
  const interval = parent ? 30 : 22; // Default vertical distance between each terminal
  const base = parent ? 290 : nodeHeight / 2 - 7; // Middle Position

  // Even-numbered terminals stacked upwards
  if (count % 2 === 0) return base - interval * (count / 2);

  // Odd-numbered terminals stacked downwards
  if (count % 2 !== 0) return base + interval * Math.floor(count / 2) + interval;
};

export default SetTerminalYPos;
