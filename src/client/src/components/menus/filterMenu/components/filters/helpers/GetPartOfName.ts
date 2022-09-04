import { Node, Connector, Aspect } from "@mimirorg/modelbuilder-types";

export const GetPartOfName = (conn: Connector, node: Node) => {
  return `${conn.name} ${Aspect[node.aspect]}`;
};
