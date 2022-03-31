import { Connector } from "../../../../models";
import { EDGE_TYPE, EdgeType } from "../../../../models/project";
import { IsLocationTerminal, IsPartOfTerminal, IsProductTerminal, IsTransport } from "../../helpers/Connectors";

const GetTreeEdgeType = (conn: Connector): EdgeType => {
  if (IsPartOfTerminal(conn)) return EDGE_TYPE.TREE_PARTOF as EdgeType;
  if (IsLocationTerminal(conn) || IsProductTerminal(conn)) return EDGE_TYPE.TREE_RELATION as EdgeType;
  if (IsTransport(conn)) return EDGE_TYPE.TREE_TRANSPORT as EdgeType;
};

export default GetTreeEdgeType;
