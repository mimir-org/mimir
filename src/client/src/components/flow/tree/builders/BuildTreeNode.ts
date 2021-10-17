import { Node } from "../../../../models";
import { ConvertNodeToFlow } from "../../converters";

const BuildTreeNode = (node: Node) => {
  if (!node) return null;
  const position = { x: node.positionX, y: node.positionY };

  return ConvertNodeToFlow(node, position);
};

export default BuildTreeNode;
