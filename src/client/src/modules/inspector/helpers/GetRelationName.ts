import { RelationType } from "../../../models";

const GetRelationName = (type: RelationType) => {
  if (type === RelationType.PartOf) return "Part Of";
  if (type === RelationType.HasLocation) return "Has Location";
  if (type === RelationType.FulfilledBy) return "Fulfilled By";
  if (type === undefined) return "Transport";
};

export default GetRelationName;
