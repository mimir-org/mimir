import { BlockTransportEdge } from "../edges/transport/BlockTransportEdge";
import { BlockOffPageEdge } from "../edges/offpage/BlockOffPageEdge";
import { BlockRelationEdge } from "../edges/relation/BlockRelationEdge";
import { BlockPartOfEdge } from "../edges/partOf/BlockPartOfEdge";

const GetBlockEdgeTypes = {
  BlockTransportEdgeType: BlockTransportEdge,
  BlockRelationEdgeType: BlockRelationEdge,
  BlockPartOfEdgeType: BlockPartOfEdge,
  BlockOffPageEdgeType: BlockOffPageEdge,
};

export default GetBlockEdgeTypes;
