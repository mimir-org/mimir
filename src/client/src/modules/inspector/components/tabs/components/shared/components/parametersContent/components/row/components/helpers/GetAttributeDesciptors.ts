import { TextResources } from "../../../../../../../../../../../../assets/text/TextResources";
import { CombinedAttribute } from "../../../../../../../../../../../../models";
import { Descriptor } from "../../../../../../../../../../../../models/project";

/**
 * Component to populate a list of Descriptors for an Attribute.
 * @param combination
 * @returns a list of Desciptors.
 */
export const GetAttributeDescriptors = (combination: CombinedAttribute) => {
  const descriptors = [] as Descriptor[];

  if (combination.specifiedScope != undefined) {
    descriptors.push({ header: TextResources.SPECIFIED_SCOPE, value: combination.specifiedScope });
  }

  if (combination.specifiedProvenance != undefined) {
    descriptors.push({
      header: TextResources.SPECIFIED_PROVENANCE,
      value: combination.specifiedProvenance,
    });
  }

  if (combination.rangeSpecifying != undefined) {
    descriptors.push({ header: TextResources.RANGE_SPECIFYING, value: combination.rangeSpecifying });
  }

  if (combination.regularitySpecified != undefined) {
    descriptors.push({
      header: TextResources.REGULARITY_SPECIFIED,
      value: combination.regularitySpecified,
    });
  }
  return descriptors;
};
