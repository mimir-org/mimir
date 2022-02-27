import { TreeTransportEdge } from "../edges/transport/TreeTransportEdge";
import { TreePartEdge } from "../edges/partOf/TreePartEdge";
import { TreeRelationEdge } from "../edges/relation/TreeRelationEdge";

const GetEdgeTypes = {
  PartEdgeType: TreePartEdge,
  RelationEdgeType: TreeRelationEdge,
  TransportEdgeType: TreeTransportEdge,
};

export default GetEdgeTypes;
