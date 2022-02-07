import { Connector } from "../../../../models";
import { EDGE_TYPE, EdgeType } from "../../../../models/project";
import { IsPartOf, IsProductTerminal, IsTransport } from "../../helpers";

const GetBlockEdgeType = (conn: Connector): EdgeType => {
  if (IsPartOf(conn)) return EDGE_TYPE.BLOCK_PART as EdgeType;
  if (IsTransport(conn) || IsProductTerminal(conn)) return EDGE_TYPE.BLOCK as EdgeType;
};

export default GetBlockEdgeType;
