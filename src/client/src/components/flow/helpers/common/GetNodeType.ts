import { Aspect, Node } from "../../../../models";

const GetNodeType = (node: Node) => {
  let typeName = node.isRoot ? "Aspect" : "";
  typeName += Aspect[node.aspect];
  return typeName;
};

export default GetNodeType;
