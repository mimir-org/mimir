const CalculateIndentLevel = (indent: number) => {
  const margin = 45;
  const increase = 20;
  return margin + indent * increase;
};

export default CalculateIndentLevel;
