/* Component to give each terminal a Y position to be handled by CSS in HandleBox */
const SetTerminalYPos = (count: number) => {
  const base = 50; // Middle position
  const interval = 21;

  if (count === 0 || count === 1) return base;
  if (count % 2 === 0) return base - interval * (count / 2);
  if (count % 2 !== 0) return base + interval * (count - 2);
};

export default SetTerminalYPos;
