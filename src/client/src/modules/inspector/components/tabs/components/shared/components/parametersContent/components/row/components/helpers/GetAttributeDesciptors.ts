import { TextResources } from "../../../../../../../../../../../../assets/text/TextResources";
import { CombinedAttribute } from "../../../../../../../../../../../../models";
import { AttributeDescriptor } from "../../../../../../../../../../../../models/project";

/**
 * Component to populate a list of Descriptors for an Attribute.
 * @param combination
 * @returns a list of Desciptors.
 */
export const GetAttributeDescriptors = (combination: CombinedAttribute) => {
  const descriptors = [] as AttributeDescriptor[];

  if (combination.specifiedScope != undefined && combination.specifiedScope.length > 0) {
    descriptors.push({ header: TextResources.SPECIFIED_SCOPE, value: combination.specifiedScope });
  }

  if (combination.specifiedProvenance != undefined && combination.specifiedProvenance.length > 0) {
    descriptors.push({
      header: TextResources.SPECIFIED_PROVENANCE,
      value: combination.specifiedProvenance,
    });
  }

  if (combination.rangeSpecifying != undefined && combination.rangeSpecifying.length > 0) {
    descriptors.push({ header: TextResources.RANGE_SPECIFYING, value: combination.rangeSpecifying });
  }

  if (combination.regularitySpecified != undefined && combination.regularitySpecified.length > 0) {
    descriptors.push({
      header: TextResources.REGULARITY_SPECIFIED,
      value: combination.regularitySpecified,
    });
  }

  return descriptors;
};
