import { BlockTransportEdge } from "../edges/transport/BlockTransportEdge";
import { BlockRelationEdge } from "../edges/relation/BlockRelationEdge";
import { BlockPartOfEdge } from "../edges/partOf/BlockPartOfEdge";

const GetBlockEdgeTypes = {
  BlockTransportEdgeType: BlockTransportEdge,
  BlockRelationEdgeType: BlockRelationEdge,
  BlockPartOfEdgeType: BlockPartOfEdge,
};

export default GetBlockEdgeTypes;
