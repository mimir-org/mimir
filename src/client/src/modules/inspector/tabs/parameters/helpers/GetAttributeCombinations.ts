import {
  Attribute,
  CombinedAttribute,
  CombinedAttributeFilter,
} from "../../../../../models";

const GetAttributeCombinations = (
  attributeFilters: CombinedAttributeFilter[],
  attributes: Attribute[]
) => {
  const combinations = {};

  for (let filter of attributeFilters) {
    combinations[filter.name] = filter.combinedAttributes.filter(
      (combination) =>
        attributes.find(
          (attr) =>
            attr.key === filter.name &&
            DoesCombinationMatchAttribute(combination, attr)
        )
    );
  }

  return combinations;
};

const DoesCombinationMatchAttribute = (
  combination: CombinedAttribute,
  attribute: Attribute
) =>
  combination.qualifierId === attribute.qualifierId &&
  combination.sourceId === attribute.sourceId &&
  combination.conditionId === attribute.conditionId;

export { GetAttributeCombinations, DoesCombinationMatchAttribute };
