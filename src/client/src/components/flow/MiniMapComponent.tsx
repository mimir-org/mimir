import { MiniMap, Node } from "react-flow-renderer";

const MiniMapComponent = () => {
  let color: string;

  return (
    <MiniMap
      nodeStrokeColor={(node: Node): string => {
        return node.type === "input"
          ? (color = "#00041d0")
          : node.type === "selectorNode"
          ? (color = "#ccc")
          : node.type === "output"
          ? (color = "#ff0072")
          : (color = "#eee");
      }}
      nodeColor={(node: Node): string => {
        return node.type === "selectorNode"
          ? (color = "#ccc")
          : (color = "#888");
      }}
    />
  );
};

export default MiniMapComponent;