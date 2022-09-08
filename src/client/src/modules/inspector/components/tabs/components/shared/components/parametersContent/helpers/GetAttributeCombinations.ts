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

  for (let i = 0; i < attributes.length; i++) {
    const attributeCombined =
      "(" + attributes[i].qualifier + ")," + "(" + attributes[i].source + ")," + "(" + attributes[i].condition + ")";
    const actualFilter = filters.filter((x) => x.name === attributes[i].entity)[0];
    if (actualFilter) {
      if (!actualFilter.combinedAttributes.some((x) => x.combined === attributeCombined)) {
        actualFilter.combinedAttributes.push({
          qualifier: attributes[i].qualifier,
          source: attributes[i].source,
          condition: attributes[i].condition,
          combined: attributeCombined,
        });
      }
    } else {
      const newFilter = {
        name: attributes[i].entity,
        combinedAttributes: [
          {
            qualifier: attributes[i].qualifier,
            source: attributes[i].source,
            condition: attributes[i].condition,
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
