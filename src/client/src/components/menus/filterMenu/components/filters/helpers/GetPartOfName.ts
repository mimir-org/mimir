import { Aspect, AspectObject, Connector } from "lib";

export const GetPartOfName = (conn: Connector, node: AspectObject) => {
  return `${conn.name} ${Aspect[node.aspect]}`;
};
