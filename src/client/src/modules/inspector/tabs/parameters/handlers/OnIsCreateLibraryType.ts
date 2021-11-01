import { Dispatch } from "redux";
import { CombinedAttributeFilter } from "../../../../../models";
import { CombinedAttributeDict, InspectorParametersElement } from "../../../types";
import { addAllAttributeFilters, addCombinedAttribute } from "../redux/actions";
import { FilterDict } from "../redux/types";

export const OnIsCreateLibraryType = (
  parametersElement: InspectorParametersElement,
  attributeFilters: CombinedAttributeFilter[],
  selectedFilters: FilterDict,
  attributeCombinations: CombinedAttributeDict,
  dispatch: Dispatch
) => {
  if (attributeFilters.length !== Object.keys(selectedFilters).length) {
    dispatch(
      addAllAttributeFilters(
        parametersElement.id,
        attributeFilters.map((filter) => filter.name)
      )
    );

    attributeFilters.forEach((filter) =>
      attributeCombinations[filter.name].forEach((combination) =>
        dispatch(addCombinedAttribute(parametersElement.id, filter.name, combination))
      )
    );
  }
};
