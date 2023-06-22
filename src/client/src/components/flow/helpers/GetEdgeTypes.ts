import {
  TreeRelationEdge,
  TreeTransportEdge,
  TreeConnectionPartOf,
  BlockTransportEdge,
  BlockRelationEdge,
  BlockPartOfEdge,
} from "../tree/edges";

const GetEdgeTypes = {
  TreeConnectionPartOf: TreeConnectionPartOf,
  TreeRelationEdgeType: TreeRelationEdge,
  TreeTransportEdgeType: TreeTransportEdge,
  BlockTransportEdgeType: BlockTransportEdge,
  BlockRelationEdgeType: BlockRelationEdge,
  BlockPartOfEdgeType: BlockPartOfEdge,
};

export default GetEdgeTypes;
