import { Dispatch } from "redux";
import { CombinedAttributeFilter, CreateLibraryType } from "../../../../../models";
import { CombinedAttributeDict } from "../../../types";
import { addAllAttributeFilters, addCombinedAttribute } from "../redux/actions";
import { FilterDict } from "../redux/types";

export const OnIsCreateLibraryType = (
  createLibraryType: CreateLibraryType,
  attributeFilters: CombinedAttributeFilter[],
  selectedFilters: FilterDict,
  attributeCombinations: CombinedAttributeDict,
  dispatch: Dispatch
) => {
  if (attributeFilters.length !== Object.keys(selectedFilters).length) {
    dispatch(
      addAllAttributeFilters(
        createLibraryType.id,
        attributeFilters.map((filter) => filter.name)
      )
    );

    attributeFilters.forEach((filter) =>
      attributeCombinations[filter.name].forEach((combination) =>
        dispatch(addCombinedAttribute(createLibraryType.id, filter.name, combination))
      )
    );
  }
};
