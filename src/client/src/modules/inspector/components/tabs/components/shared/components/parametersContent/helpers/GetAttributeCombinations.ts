import { CombinedAttribute, CombinedAttributeFilter } from "../../../../../../../../../models";
import { AttributeLikeItem, CombinedAttributeDict } from "../../../../../../../types";

/**
 * Expects attributes not to be a mixed list of Attribute and AttributeType.
 */
const GetAttributeCombinations = (
  attributeFilters: CombinedAttributeFilter[],
  attributes: AttributeLikeItem[]
): CombinedAttributeDict => {
  const combinations: CombinedAttributeDict = {};

  for (const filter of attributeFilters) {
    combinations[filter.name] = filter.combinedAttributes.filter((combination) =>
      attributes.find((attr) => attr.entity === filter.name && DoesCombinationMatchAttribute(combination, attr))
    );
  }

  return combinations;
};

const DoesCombinationMatchAttribute = (combination: CombinedAttribute, attribute: AttributeLikeItem) =>
  combination.qualifier === attribute.qualifier &&
  combination.source === attribute.source &&
  combination.condition === attribute.condition;

export { GetAttributeCombinations, DoesCombinationMatchAttribute };
