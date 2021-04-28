import { Node } from "../../../../models/project";

const GetAttributes = (node: Node, attributeType: string) => {
  return node.attributes.filter((x) => x.type === attributeType);
};

export default GetAttributes;
