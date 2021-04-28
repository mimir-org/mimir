import { ATTRIBUTE_TYPE, Node } from "../../../../models/project";

const GetAttributes = (node: Node, index: number) => {
  let attributeType: string =
    index === 0
      ? ATTRIBUTE_TYPE.ADMIN_INFO
      : index === 1
      ? ATTRIBUTE_TYPE.TECH_INFO
      : index === 2
      ? ATTRIBUTE_TYPE.RELATIONS
      : null;

  return node.attributes.filter((x) => x.type === attributeType);
};

export default GetAttributes;
