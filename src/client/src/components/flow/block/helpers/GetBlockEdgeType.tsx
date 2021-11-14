import { Connector } from "../../../../models";
import { EdgeType, EDGE_TYPE } from "../../../../models/project";
import { IsProductTerminal, IsPartOf, IsTransport } from "../../helpers";

const GetBlockEdgeType = (conn: Connector): EdgeType => {
  if (IsPartOf(conn)) return EDGE_TYPE.BLOCK_PART as EdgeType;
  if (IsTransport(conn) || IsProductTerminal(conn)) return EDGE_TYPE.BLOCK as EdgeType;
};

export default GetBlockEdgeType;
