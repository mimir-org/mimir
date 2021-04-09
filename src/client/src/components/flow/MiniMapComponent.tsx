import { MiniMap, Node } from "react-flow-renderer";
import { NODE_TYPE } from "../../models/project";

const MiniMapComponent = () => {
  let color: string;

  return (
    <MiniMap
      nodeStrokeColor={(node: Node): string => {
        return node.type === NODE_TYPE.FUNCTION
          ? (color = "yellow")
          : node.type === NODE_TYPE.PRODUCT
          ? (color = "turquoise")
          : node.type === NODE_TYPE.LOCATION
          ? (color = "magenta")
          : node.type === NODE_TYPE.ASPECT &&
            node.data.name === NODE_TYPE.FUNCTION
          ? (color = "yellow")
          : node.type === NODE_TYPE.ASPECT &&
            node.data.name === NODE_TYPE.PRODUCT
          ? (color = "turquoise")
          : node.type === NODE_TYPE.ASPECT &&
            node.data.name === NODE_TYPE.LOCATION
          ? (color = "magenta")
          : null;
      }}
      nodeColor={(node: Node): string => {
        return node.type === NODE_TYPE.FUNCTION
          ? (color = "yellow")
          : node.type === NODE_TYPE.PRODUCT
          ? (color = "turquoise")
          : node.type === NODE_TYPE.LOCATION
          ? (color = "magenta")
          : node.type === NODE_TYPE.ASPECT &&
            node.data.name === NODE_TYPE.FUNCTION
          ? (color = "yellow")
          : node.type === NODE_TYPE.ASPECT &&
            node.data.name === NODE_TYPE.PRODUCT
          ? (color = "turquoise")
          : node.type === NODE_TYPE.ASPECT &&
            node.data.name === NODE_TYPE.LOCATION
          ? // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (color = "magenta")
          : null;
      }}
    />
  );
};

export default MiniMapComponent;
