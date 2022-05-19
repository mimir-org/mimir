import { Aspect, Connector, Node } from "../../../../../../models";

export const GetPartOfName = (conn: Connector, node: Node) => {
  return `${conn.name} ${Aspect[node.aspect]}`;
};
