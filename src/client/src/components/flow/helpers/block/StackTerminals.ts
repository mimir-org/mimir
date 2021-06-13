const StackTerminals = (count: number) => {
  if (count === 1) return 50;
  if (count === 2) return 20;
  if (count === 3) return 80;
  if (count === 4) return 0;
  if (count === 5) return 100;
  return 50;
};

export default StackTerminals;
