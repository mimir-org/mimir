const GetIndentLevel = (indent: number) => {
  const base = 10;
  const multiplier = indent > 1 ? indent : 0;
  return `${base + multiplier * base}px`;
};

export default GetIndentLevel;
