const GetEdgeStyle = (color: string, visible: boolean) => {
  return {
    stroke: color,
    strokeWidth: "2px",
    opacity: visible ? "1" : "0",
    transition: "opacity 500ms",
  };
};

export default GetEdgeStyle;
