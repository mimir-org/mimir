import { Connector } from "../../../../models";
import { EdgeType, EDGE_TYPE } from "../../../../models/project";
import {
  IsFulfilledByTerminal,
  IsLocationTerminal,
  IsPartOfTerminal,
  IsTransportTerminal,
} from "../common";

const GetEdgeType = (conn: Connector): EdgeType => {
  if (IsPartOfTerminal(conn)) return EDGE_TYPE.PART as EdgeType;
  if (IsLocationTerminal(conn)) return EDGE_TYPE.RELATION as EdgeType;
  if (IsFulfilledByTerminal(conn)) return EDGE_TYPE.RELATION as EdgeType;
  if (IsTransportTerminal(conn)) return EDGE_TYPE.TRANSPORT as EdgeType;
  return EDGE_TYPE.DEFAULT as EdgeType;
};

export default GetEdgeType;
