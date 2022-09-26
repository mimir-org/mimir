import { Attribute } from "@mimirorg/modelbuilder-types";
import { CombinedAttribute, CombinedAttributeFilter } from "../../../../../../../../../models";
import { CombinedAttributeDict } from "../../../../../../../types";

/**
 * Expects attributes not to be a mixed list of Attribute and AttributeType.
 */
const GetAttributeCombinations = (
  attributeFilters: CombinedAttributeFilter[],
  attributes: Attribute[]
): CombinedAttributeDict => {
  const combinations: CombinedAttributeDict = {};

  for (const filter of attributeFilters) {
    combinations[filter.name] = filter.combinedAttributes.filter((combination) =>
      attributes.find((attr) => attr.entity === filter.name && DoesCombinationMatchAttribute(combination, attr))
    );
  }
  return combinations;
};

const GetCombinedAttributeFilters = (attributes: Attribute[]): CombinedAttributeFilter[] => {
  const filters = [] as CombinedAttributeFilter[];

  if (!attributes || attributes == null || attributes.length < 1) {
    return filters;
  }

  for (const element of attributes) {
    const attributeCombined = "(" + element.specifiedScope + ")," + "(" + element.specifiedProvenance + ")," + "(" + element.rangeSpecifying + ")" + "(" + element.regularitySpecified + ")";
    const actualFilter = filters.filter((f) => f.name === element.entity)[0];

    if (actualFilter) {
      if (!actualFilter.combinedAttributes.some((x) => x.combined === attributeCombined)) {
        actualFilter.combinedAttributes.push({
          specifiedScope: element.specifiedScope,
          specifiedProvenance: element.specifiedProvenance,
          rangeSpecifying: element.rangeSpecifying,
          regularitySpecified: element.regularitySpecified,
          combined: attributeCombined,
        });
      }
    } else {
      const newFilter = {
        name: element.entity,
        combinedAttributes: [
          {
            specifiedScope: element.specifiedScope,
            specifiedProvenance: element.specifiedProvenance,
            rangeSpecifying: element.rangeSpecifying,
            regularitySpecified: element.regularitySpecified,
            combined: attributeCombined,
          },
        ],
      } as CombinedAttributeFilter;
      filters.push(newFilter);
    }
  }
  return filters;
};

const DoesCombinationMatchAttribute = (combination: CombinedAttribute, attribute: Attribute) =>
  combination.specifiedScope === attribute.specifiedScope &&
  combination.specifiedProvenance === attribute.specifiedProvenance &&
  combination.rangeSpecifying === attribute.rangeSpecifying &&
  combination.regularitySpecified === attribute.regularitySpecified;

export { GetAttributeCombinations, DoesCombinationMatchAttribute, GetCombinedAttributeFilters };
