import { IsOffPage } from "../../../../helpers";
import { Edge } from "../../../../models";
import { EDGE_TYPE, EdgeType } from "../../../../models/project";
import { IsLocationConnection, IsProductConnection, IsTransportConnection } from "../../helpers";

const GetBlockEdgeType = (edge: Edge) => {
  if (IsOffPage(edge.fromNode) || IsOffPage(edge.toNode)) return EDGE_TYPE.BLOCK_OFFPAGE as EdgeType;
  if (IsTransportConnection(edge.fromConnector, edge.toConnector)) return EDGE_TYPE.BLOCK_TRANSPORT as EdgeType;
  if (IsProductConnection(edge.fromConnector, edge.toConnector) || IsLocationConnection(edge.fromConnector, edge.toConnector))
    return EDGE_TYPE.BLOCK_RELATION as EdgeType;
};

export default GetBlockEdgeType;
