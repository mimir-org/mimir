import { Aspect, Block, Connector } from "lib";

export const GetPartOfName = (conn: Connector, node: Block) => {
  return `${conn.name} ${Aspect[node.aspect]}`;
};
