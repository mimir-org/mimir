/**
 * Function to calculate the position of the ConnectView drop-down
 * @param count - amount of terminals
 * @returns a number
 */
const CalculateMenuPos = (count: number) => {
  let value = -65;
  const change = 27;

  for (let i = 1; i < count; i++) {
    value -= change;
  }

  return value;
};

export default CalculateMenuPos;
