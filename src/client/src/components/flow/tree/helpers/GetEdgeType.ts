import { Connector } from "../../../../models";
import { EdgeType, EDGE_TYPE } from "../../../../models/project";
import { IsProductTerminal, IsLocationTerminal, IsPartOf, IsTransport } from "../../helpers";

const GetEdgeType = (conn: Connector): EdgeType => {
  if (IsPartOf(conn)) return EDGE_TYPE.PART as EdgeType;
  if (IsLocationTerminal(conn)) return EDGE_TYPE.RELATION as EdgeType;
  if (IsProductTerminal(conn)) return EDGE_TYPE.RELATION as EdgeType;
  if (IsTransport(conn)) return EDGE_TYPE.TRANSPORT as EdgeType;
  return EDGE_TYPE.DEFAULT as EdgeType;
};

export default GetEdgeType;
