import { BlockTransportEdge } from "../block/edges/transport/BlockTransportEdge";
import { BlockRelationEdge } from "../block/edges/relation/BlockRelationEdge";
import { BlockPartOfEdge } from "../block/edges/partOf/BlockPartOfEdge";
import { TreeRelationEdge, TreeTransportEdge, TreeConnectionPartOf } from "../tree/edges";

const GetEdgeTypes = {
  TreeConnectionPartOf: TreeConnectionPartOf,
  TreeRelationEdgeType: TreeRelationEdge,
  TreeTransportEdgeType: TreeTransportEdge,
  BlockTransportEdgeType: BlockTransportEdge,
  BlockRelationEdgeType: BlockRelationEdge,
  BlockPartOfEdgeType: BlockPartOfEdge,
};

export default GetEdgeTypes;
