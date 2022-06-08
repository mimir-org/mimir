import { Attribute } from "@mimirorg/modelbuilder-types";
import { Node } from "../../../models";

const GetAttributeMap = (node: Node): Map<string, Attribute> => {
  return new Map(node?.attributes?.map((obj) => [obj.entity, obj]));
};

export default GetAttributeMap;
