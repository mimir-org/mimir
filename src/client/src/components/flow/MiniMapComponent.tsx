import { MiniMap, Node } from "react-flow-renderer";
import { NODE_TYPE } from "../../models/project";

const MiniMapComponent = () => {
  let color: string;

  return (
    <MiniMap
      nodeStrokeColor={(node: Node): string => {
        return node.type === NODE_TYPE.FUNCTION ||
          node.type === NODE_TYPE.ASPECT_FUNCTION
          ? (color = "yellow")
          : node.type === NODE_TYPE.PRODUCT ||
            node.type === NODE_TYPE.ASPECT_PRODUCT
          ? (color = "turquoise")
          : node.type === NODE_TYPE.LOCATION ||
            node.type === NODE_TYPE.ASPECT_LOCATION
          ? (color = "magenta")
          : null;
      }}
      nodeColor={(node: Node): string => {
        return node.type === NODE_TYPE.FUNCTION ||
          node.type === NODE_TYPE.ASPECT_FUNCTION
          ? (color = "yellow")
          : node.type === NODE_TYPE.PRODUCT ||
            node.type === NODE_TYPE.ASPECT_PRODUCT
          ? (color = "turquoise")
          : node.type === NODE_TYPE.LOCATION ||
            node.type === NODE_TYPE.ASPECT_LOCATION
          ? (color = "magenta")
          : null;
      }}
    />
  );
};

export default MiniMapComponent;
