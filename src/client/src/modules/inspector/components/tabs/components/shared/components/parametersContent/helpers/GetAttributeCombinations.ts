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
    const attributeCombined = "(" + element.qualifier + ")," + "(" + element.source + ")," + "(" + element.condition + ")";
    const actualFilter = filters.filter((f) => f.name === element.entity)[0];

    if (actualFilter) {
      if (!actualFilter.combinedAttributes.some((x) => x.combined === attributeCombined)) {
        actualFilter.combinedAttributes.push({
          qualifier: element.qualifier,
          source: element.source,
          condition: element.condition,
          combined: attributeCombined,
        });
      }
    } else {
      const newFilter = {
        name: element.entity,
        combinedAttributes: [
          {
            qualifier: element.qualifier,
            source: element.source,
            condition: element.condition,
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
  combination.qualifier === attribute.qualifier &&
  combination.source === attribute.source &&
  combination.condition === attribute.condition;

export { GetAttributeCombinations, DoesCombinationMatchAttribute, GetCombinedAttributeFilters };
