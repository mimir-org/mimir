import { CombinedAttribute, CombinedAttributeFilter } from "../../../../../models";
import { GetAttributeLikeItemKey } from "../../../helpers/IsType";
import { AttributeLikeItem } from "../../../types";

/**
 * Expects attributes not to be a mixed list of Attribute and AttributeType.
 */
const GetAttributeCombinations = (attributeFilters: CombinedAttributeFilter[], attributes: AttributeLikeItem[]) => {
  const combinations = {};

  if (!attributes?.length || attributes.length === 0) {
    return combinations;
  }

  const key = GetAttributeLikeItemKey(attributes[0]);

  for (let filter of attributeFilters) {
    combinations[filter.name] = filter.combinedAttributes.filter((combination) =>
      attributes.find((attr) => attr[key] === filter.name && DoesCombinationMatchAttribute(combination, attr))
    );
  }

  return combinations;
};

const DoesCombinationMatchAttribute = (combination: CombinedAttribute, attribute: AttributeLikeItem) =>
  combination.qualifierId === attribute.qualifierId &&
  combination.sourceId === attribute.sourceId &&
  combination.conditionId === attribute.conditionId;

export { GetAttributeCombinations, DoesCombinationMatchAttribute };
