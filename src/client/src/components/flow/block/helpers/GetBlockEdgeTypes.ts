import { BlockTransportEdge } from "../edges/transport/BlockTransportEdge";
import { BlockRelationEdge } from "../edges/relation/BlockRelationEdge";
import { BlockPartOfEdge } from "../edges/partOf/BlockPartOfEdge";
import { TreePartOfEdge } from "../../tree/edges/partOf";

const GetBlockEdgeTypes = {
  TreePartOfEdgeType: TreePartOfEdge,
  BlockTransportEdgeType: BlockTransportEdge,
  BlockRelationEdgeType: BlockRelationEdge,
  BlockPartOfEdgeType: BlockPartOfEdge,
};

export default GetBlockEdgeTypes;
