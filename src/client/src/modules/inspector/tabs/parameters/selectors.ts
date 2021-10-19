import { createSelector } from "@reduxjs/toolkit";
import { Attribute } from "../../../../models";
import { RootState } from "../../../../redux/store";

export const selectedFilterSelector = createSelector(
  (state: RootState) => state.parametersReducer.selectedAttributeFilters,
  (_, parametersElementId: string) => parametersElementId,
  (selectedAttributeFilters, parametersElementId) => selectedAttributeFilters[parametersElementId] ?? {}
);

export const filterSelector = createSelector(
  (state: RootState) => state.commonState.filters,
  (_, attributes: Attribute[]) => attributes,
  (filters, attributes) => filters.filter((x) => attributes.find((att) => att.key === x.name)) ?? []
);
