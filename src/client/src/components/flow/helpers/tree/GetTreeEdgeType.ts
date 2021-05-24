import {
  EdgeType,
  Connector,
  RELATION_TYPE,
  EDGE_TYPE,
} from "../../../../models/project";

const GetTreeEdgeType = (connector: Connector): EdgeType => {
  switch (connector?.relationType) {
    case RELATION_TYPE.PartOf:
      return EDGE_TYPE.PART as EdgeType;
    case RELATION_TYPE.HasLocation || RELATION_TYPE.FulfilledBy:
      return EDGE_TYPE.RELATION as EdgeType;
    case RELATION_TYPE.Transport:
      return EDGE_TYPE.TRANSPORT as EdgeType;
    default:
      return EDGE_TYPE.DEFAULT as EdgeType;
  }
};

export default GetTreeEdgeType;
