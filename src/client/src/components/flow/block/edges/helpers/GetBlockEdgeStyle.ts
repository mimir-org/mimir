export const GetBlockEdgeStyle = (color: string, visible: boolean) => {
  return {
    stroke: color,
    opacity: visible ? 1 : 0,
    transition: "opacity 250ms",
  };
};
