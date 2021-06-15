const StackTerminals = (order: number) => {
  if (order === 0) return 40;
  if (order === 1) return 10;
  if (order === 2) return -20;
  if (order === 3) return 0;
  if (order === 4) return 100;
};

export default StackTerminals;
