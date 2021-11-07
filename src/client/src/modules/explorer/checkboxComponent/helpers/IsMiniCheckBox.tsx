import { Node } from "../../../../models";

const IsMiniCheckBox = (node: Node, selectedNode: Node, secondaryNode: Node) => {
  return node?.id !== selectedNode?.id && node?.id !== secondaryNode?.id;
};

export default IsMiniCheckBox;
