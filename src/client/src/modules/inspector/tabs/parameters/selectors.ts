import { Attribute } from "../../../../models";
import { createParametricAppSelector, RootState } from "../../../../redux/store";

export const makeFilterSelector = () =>
  createParametricAppSelector(
    (state: RootState) => state.commonState.filters,
    (_, attributes: Attribute[]) => attributes,
    (filters, attributes) => filters.filter((x) => attributes.find((att) => att.key === x.name)) ?? []
  );
export const makeSelectedFilterSelector = () =>
  createParametricAppSelector(
    (state: RootState) => state.parametersReducer.selectedAttributeFilters,
    (_, parametersElementId: string) => parametersElementId,
    (selectedAttributeFilters, parametersElementId) => selectedAttributeFilters[parametersElementId] ?? {}
  );
