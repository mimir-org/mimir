import { Aspect, Connector, Node } from "../../../../models";

const GetPartOfName = (conn: Connector, node: Node) => {
  return conn.name + " " + Aspect[node.aspect];
};

export default GetPartOfName;
