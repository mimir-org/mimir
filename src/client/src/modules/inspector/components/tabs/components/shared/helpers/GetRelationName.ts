import { TextResources } from "../../../../../../../assets/text/TextResources";
import { RelationType } from "../../../../../../../models";

export const GetRelationName = (type: RelationType) => {
  if (type === RelationType.PartOf) return TextResources.PARTOF;
  if (type === RelationType.HasLocation) return TextResources.HAS_LOCATION;
  if (type === RelationType.FulfilledBy) return TextResources.FULFILLED_BY;
  else return TextResources.TRANSPORT;
};
