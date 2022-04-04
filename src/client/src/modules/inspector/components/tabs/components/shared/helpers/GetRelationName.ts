import { TextResources } from "../../../../../../../assets/text/TextResources";
import { RelationType } from "../../../../../../../models";

export const GetRelationName = (type: RelationType) => {
  if (type === RelationType.PartOf) return TextResources.RELATION_PARTOF;
  if (type === RelationType.HasLocation) return TextResources.RELATIONS_HASLOCATION;
  if (type === RelationType.FulfilledBy) return TextResources.RELATIONS_FULFILLEDBY;
  else return TextResources.RELATIONS_TRANSPORT;
};
