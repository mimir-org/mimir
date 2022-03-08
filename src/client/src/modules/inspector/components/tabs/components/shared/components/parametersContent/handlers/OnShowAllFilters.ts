import { Dispatch } from "redux";
import { CombinedAttributeFilter } from "../../../../../../../../../models";
import { CombinedAttributeDict } from "../../../../../../../types";
import { addAllAttributeFilters, addCombinedAttribute } from "../../../../parameters/redux/parametersSlice";

export const OnShowAllFilters = (
  elementId: string,
  filters: CombinedAttributeFilter[],
  attributeCombinations: CombinedAttributeDict,
  dispatch: Dispatch
) => {
  dispatch(addAllAttributeFilters({ elementId, filterNames: filters.map((filter) => filter.name) }));

  filters.forEach((filter) =>
    attributeCombinations[filter.name].forEach((combination) =>
      dispatch(addCombinedAttribute({ elementId, filterName: filter.name, combination }))
    )
  );
};
