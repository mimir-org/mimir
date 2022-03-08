import { CombinedAttribute } from "../../../../../../../models";

export interface ReducerState {
  selectedAttributeFilters: AttributeDict;
}

export interface AttributeDict {
  [elementId: string]: FilterDict;
}

export interface FilterDict {
  [filterName: string]: CombinedAttribute[];
}

export interface AttributeFilter {
  elementId: string;
  filterName: string;
}

export interface AttributeFilters {
  elementId: string;
  filterNames: string[];
}

export interface CombinedAttributeFilter {
  elementId: string;
  filterName: string;
  combination: CombinedAttribute;
}
