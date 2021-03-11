import { MiniMap, Node } from "react-flow-renderer";

const DrawMiniMap = () => {
  return (
    <MiniMap
      nodeStrokeColor={(node: Node): string => {
        if (node.type === "input") return "#0041d0";
        if (node.type === "selectorNode") return "#ccc";
        if (node.type === "output") return "#ff0072";

        return "#eee";
      }}
      nodeColor={(node: Node): string => {
        if (node.type === "selectorNode") return "#ccc";

        return "#fff";
      }}
    />
  );
};

export default DrawMiniMap;
