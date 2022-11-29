import { BlockTransportEdge } from "../block/edges/transport/BlockTransportEdge";
import { BlockRelationEdge } from "../block/edges/relation/BlockRelationEdge";
import { BlockPartOfEdge } from "../block/edges/partOf/BlockPartOfEdge";
import { TreePartOfEdge } from "../tree/edges/partOf";
import { TreeRelationEdge } from "../tree/edges/relation/TreeRelationEdge";
import { TreeTransportEdge } from "../tree/edges/transport/TreeTransportEdge";

const GetEdgeTypes = {
  TreePartOfEdgeType: TreePartOfEdge,
  TreeRelationEdgeType: TreeRelationEdge,
  TreeTransportEdgeType: TreeTransportEdge,
  BlockTransportEdgeType: BlockTransportEdge,
  BlockRelationEdgeType: BlockRelationEdge,
  BlockPartOfEdgeType: BlockPartOfEdge,
};

export default GetEdgeTypes;
