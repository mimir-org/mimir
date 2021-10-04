import { TextResources } from "../../../assets/text";
import { RelationType } from "../../../models";

const GetRelationName = (type: RelationType) => {
  if (type === RelationType.PartOf) return TextResources.Relation_PartOf;
  if (type === RelationType.HasLocation) return TextResources.Relations_HasLocation;
  if (type === RelationType.FulfilledBy) return TextResources.Relations_FulfilledBy;
  else return TextResources.Relations_Transport;
};

export default GetRelationName;
