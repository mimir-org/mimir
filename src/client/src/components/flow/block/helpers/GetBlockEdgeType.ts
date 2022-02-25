import { Connector } from "../../../../models";
import { EDGE_TYPE, EdgeType } from "../../../../models/project";
import { IsProductTerminal, IsTransport } from "../../helpers";

const GetBlockEdgeType = (conn: Connector): EdgeType => {
  if (IsTransport(conn)) return EDGE_TYPE.BLOCK_TRANSPORT as EdgeType;
  if (IsProductTerminal(conn)) return EDGE_TYPE.BLOCK_RELATION as EdgeType;
};

export default GetBlockEdgeType;
