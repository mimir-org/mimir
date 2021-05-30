const CalculateRows = (length: number): number => {
  let rows = 0;
  const columns = 6;
  rows = length / columns;
  return Math.ceil(rows);
};

export default CalculateRows;
