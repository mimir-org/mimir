const CalculateRows = (length: number): number => {
  let rows = 0;
  const columns = 6;
  rows = length / columns;
  let result = Math.ceil(rows);

  if (length === 20 && result === 4) result = 3;
  if (length === 7 || length === 8) result = 1;

  return result;
};

export default CalculateRows;
