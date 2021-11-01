import { Dispatch } from "redux";
import { CombinedAttributeFilter } from "../../../../../models";
import { CombinedAttributeDict } from "../../../types";
import { addAllAttributeFilters, addCombinedAttribute } from "../redux/actions";

const OnShowAllFilters = (
  elementId: string,
  filters: CombinedAttributeFilter[],
  attributeCombinations: CombinedAttributeDict,
  dispatch: Dispatch<any>
) => {
  dispatch(
    addAllAttributeFilters(
      elementId,
      filters.map((filter) => filter.name)
    )
  );

  filters.forEach((filter) =>
    attributeCombinations[filter.name].forEach((combination) =>
      dispatch(addCombinedAttribute(elementId, filter.name, combination))
    )
  );
};

export default OnShowAllFilters;
