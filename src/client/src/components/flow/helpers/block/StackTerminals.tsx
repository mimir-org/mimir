const StackTerminals = (order: number) => {
  if (order === undefined) return 100;
  if (order === 0) return 50;
  if (order === 1) return 28;
  if (order === 2) return 72;
  if (order === 3) return 6;
  if (order === 4) return 94;
  if (order === 5) return -16;
  if (order === 6) return 116;
};

export default StackTerminals;
