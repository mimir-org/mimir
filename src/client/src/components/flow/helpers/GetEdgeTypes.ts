import { TreePartOfEdge } from "../tree/edges/partOf";
import { TreeRelationEdge } from "../tree/edges/relation/TreeRelationEdge";
import { TreeTransportEdge } from "../tree/edges/transport/TreeTransportEdge";

const GetEdgeTypes = {
  TreePartOfEdgeType: TreePartOfEdge,
  TreeRelationEdgeType: TreeRelationEdge,
  TreeTransportEdgeType: TreeTransportEdge,
};

export default GetEdgeTypes;
