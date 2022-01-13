import { Connector } from "../../../../models";
import { EDGE_TYPE, EdgeType } from "../../../../models/project";
import { IsLocationTerminal, IsPartOf, IsProductTerminal, IsTransport } from "../../helpers";

const GetEdgeType = (conn: Connector): EdgeType => {
  if (IsPartOf(conn)) return EDGE_TYPE.PART as EdgeType;
  if (IsLocationTerminal(conn)) return EDGE_TYPE.RELATION as EdgeType;
  if (IsProductTerminal(conn)) return EDGE_TYPE.RELATION as EdgeType;
  if (IsTransport(conn)) return EDGE_TYPE.TRANSPORT as EdgeType;
};

export default GetEdgeType;
