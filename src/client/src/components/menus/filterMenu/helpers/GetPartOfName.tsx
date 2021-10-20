import { Aspect, Connector, Node } from "../../../../models";

const GetPartOfName = (conn: Connector, nodes: Node[]) => {
  const fromNode = nodes.find((n) => n.id === conn.nodeId);
  return conn.name + " " + Aspect[fromNode.aspect];
};

export default GetPartOfName;
