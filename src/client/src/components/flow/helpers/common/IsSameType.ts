import { NodeType, NODE_TYPE } from "../../../../models/project";

const IsSameType = (aspectNode: NodeType, node: NodeType) => {
  return (
    (aspectNode === NODE_TYPE.ASPECT_FUNCTION && node === NODE_TYPE.FUNCTION) ||
    (aspectNode === NODE_TYPE.ASPECT_LOCATION && node === NODE_TYPE.LOCATION) ||
    (aspectNode === NODE_TYPE.ASPECT_PRODUCT && node === NODE_TYPE.PRODUCT)
  );
};

export default IsSameType;
