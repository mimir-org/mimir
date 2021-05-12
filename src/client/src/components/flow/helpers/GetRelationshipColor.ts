import {
  RelationType,
  RELATION_TYPE,
  NodeType,
  NODE_TYPE,
} from "../../../models/project";

const GetRelationshipColor = (
  relationType: RelationType,
  nodeType: NodeType
): [name: string, color: string] => {
  let color = "";
  let name = "";

  if (relationType === RELATION_TYPE.PartOf) {
    name = "Part of Relationship";
  }

  if (relationType === RELATION_TYPE.HasLocation) {
    name = "Has Location";
  }

  if (relationType === RELATION_TYPE.FulfilledBy) {
    name = "Fulfilled By";
  }

  if (
    nodeType === (NODE_TYPE.FUNCTION as NodeType) ||
    nodeType === (NODE_TYPE.ASPECT_FUNCTION as NodeType)
  ) {
    color = "#FEF445";
  }

  if (
    nodeType === (NODE_TYPE.LOCATION as NodeType) ||
    nodeType === (NODE_TYPE.ASPECT_LOCATION as NodeType)
  ) {
    color = "#FA00FF";
  }

  if (
    nodeType === (NODE_TYPE.PRODUCT as NodeType) ||
    nodeType === (NODE_TYPE.ASPECT_PRODUCT as NodeType)
  ) {
    color = "#00F0FF";
  }

  return [name, color];
};

export default GetRelationshipColor;
