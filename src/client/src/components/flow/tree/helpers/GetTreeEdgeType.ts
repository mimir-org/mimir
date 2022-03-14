import { Connector } from "../../../../models";
import { EDGE_TYPE, EdgeType } from "../../../../models/project";
import { IsLocationTerminal, IsPartOf, IsProductTerminal, IsTransport } from "../../helpers";

const GetTreeEdgeType = (conn: Connector): EdgeType => {
  if (IsPartOf(conn)) return EDGE_TYPE.TREE_PARTOF as EdgeType;
  if (IsLocationTerminal(conn) || IsProductTerminal(conn)) return EDGE_TYPE.TREE_RELATION as EdgeType;
  if (IsTransport(conn)) return EDGE_TYPE.TREE_TRANSPORT as EdgeType;
};

export default GetTreeEdgeType;
