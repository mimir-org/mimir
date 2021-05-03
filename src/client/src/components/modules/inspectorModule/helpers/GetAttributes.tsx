import { ATTRIBUTE_TAB, Node } from "../../../../models/project";

const GetAttributes = (node: Node, index: number) => {
  let attributeType: string =
    index === 0
      ? ATTRIBUTE_TAB.ADMIN_INFO
      : index === 1
      ? ATTRIBUTE_TAB.TECH_INFO
      : index === 2
      ? ATTRIBUTE_TAB.RELATIONS
      : null;

  return node.attributes.filter((x) => x.type === attributeType);
};

export default GetAttributes;
