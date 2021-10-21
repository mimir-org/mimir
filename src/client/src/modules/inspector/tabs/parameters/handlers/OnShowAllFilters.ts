import { Dispatch } from "redux";
import { CombinedAttributeFilter } from "../../../../../models";
import { addAllAttributeFilters } from "../redux/actions";

const OnShowAllFilters = (elementId: string, filters: CombinedAttributeFilter[], dispatch: Dispatch<any>) => {
  dispatch(
    addAllAttributeFilters(
      elementId,
      filters.map((filter) => filter.name)
    )
  );
};

export default OnShowAllFilters;
