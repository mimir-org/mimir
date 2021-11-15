import { Attribute, Node } from "../../../models";

const GetAttributeMap = (node: Node): Map<string, Attribute> => {
  return new Map(node?.attributes?.map((obj) => [obj.key, obj]));
};

export default GetAttributeMap;
