import { BlockTransportEdge } from "../edges/transport/BlockTransportEdge";
import { BlockOffPageEdge } from "../edges/offpage/BlockOffPageEdge";
import { BlockRelationEdge } from "../edges/relation/BlockRelationEdge";

const GetBlockEdgeTypes = {
  BlockTransportEdgeType: BlockTransportEdge,
  BlockRelationEdgeType: BlockRelationEdge,
  BlockOffPageEdgeType: BlockOffPageEdge,
};

export default GetBlockEdgeTypes;
