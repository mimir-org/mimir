import { Dispatch } from "redux";
import { OnShowAllFilters } from ".";
import { CombinedAttributeFilter } from "../../../../../models";
import { CombinedAttributeDict, InspectorParametersElement } from "../../../types";
import { FilterDict } from "../redux/types";

export const OnIsCreateLibraryType = (
  parametersElement: InspectorParametersElement,
  attributeFilters: CombinedAttributeFilter[],
  selectedFilters: FilterDict,
  attributeCombinations: CombinedAttributeDict,
  dispatch: Dispatch
) => {
  if (attributeFilters.length !== Object.keys(selectedFilters).length) {
    OnShowAllFilters(parametersElement.id, attributeFilters, attributeCombinations, dispatch);
  }
};
