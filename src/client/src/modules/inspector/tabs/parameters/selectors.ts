import { Attribute } from "../../../../models";
import { createAppSelector, RootState } from "../../../../redux/store";

export const makeFilterSelector = () =>
  createAppSelector(
    (state: RootState) => state.commonState.filters,
    (_, attributes: Attribute[]) => attributes,
    (filters, attributes) => filters.filter((x) => attributes.find((att) => att.key === x.name)) ?? []
  );
export const makeSelectedFilterSelector = () =>
  createAppSelector(
    (state: RootState) => state.parametersReducer.selectedAttributeFilters,
    (_, parametersElementId: string) => parametersElementId,
    (selectedAttributeFilters, parametersElementId) => selectedAttributeFilters[parametersElementId] ?? {}
  );
