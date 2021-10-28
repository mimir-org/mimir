/**
 * Method to calculate a terminal's Y position in BlockView and TreeView.
 * @param count the count of input or output terminals for a node.
 * @returns a number used by the styled component HandleBox.
 */
const SetTerminalYPos = (count: number, isParent: boolean) => {
  const base = 50; // Middle position
  const interval = isParent ? 3 : 22; // Default vertical distance between each terminal

  if (count === 0 || count === 1) return base;

  // Even-numbered terminals stacked upwards
  if (count % 2 === 0) return base - interval * (count / 2);

  // Odd-numbered terminals stacked downwards
  if (count % 2 !== 0) return base + interval * Math.floor(count / 2);
};

export default SetTerminalYPos;

// const SetTerminalYPos = (count: number, isParent: boolean) => {
//   const base = 40; // Middle position
//   const interval = isParent ? 3 : 22; // Default vertical distance between each terminal

//   if (count === 0 || count === 1) return base;

//   // Even-numbered terminals stacked upwards
//   if (count % 2 === 0) return base - interval * (count / 2);

//   // Odd-numbered terminals stacked downwards
//   if (count % 2 !== 0) return base + interval * Math.floor(count / 2);
// };
