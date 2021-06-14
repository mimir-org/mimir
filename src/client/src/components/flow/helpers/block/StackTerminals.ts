const StackTerminals = (order: number) => {
  if (order === 0) return 50;
  if (order === 1) return 20;
  if (order === 2) return 80;
  if (order === 3) return 0;
  if (order === 4) return 100;
};

export default StackTerminals;
