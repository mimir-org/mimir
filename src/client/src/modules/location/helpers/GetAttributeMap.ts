import { Node, Attribute } from "@mimirorg/modelbuilder-types";

const GetAttributeMap = (node: Node): Map<string, Attribute> => {
  return new Map(node?.attributes?.map((obj) => [obj.entity, obj]));
};

export default GetAttributeMap;
