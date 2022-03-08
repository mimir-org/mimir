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
  combination.qualifierId === attribute.qualifierId &&
  combination.sourceId === attribute.sourceId &&
  combination.conditionId === attribute.conditionId;

export { GetAttributeCombinations, DoesCombinationMatchAttribute };
