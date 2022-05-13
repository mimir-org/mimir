import { TreeTransportEdge } from "../edges/transport/TreeTransportEdge";
import { TreePartOfEdge } from "../edges/partOf/";
import { TreeRelationEdge } from "../edges/relation/TreeRelationEdge";

const GetTreeEdgeTypes = {
  TreePartOfEdgeType: TreePartOfEdge,
  TreeRelationEdgeType: TreeRelationEdge,
  TreeTransportEdgeType: TreeTransportEdge,
};

export default GetTreeEdgeTypes;
