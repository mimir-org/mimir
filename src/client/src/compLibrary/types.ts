import { AttributeType } from "../models";

export interface SearchDropDownItem {
  id: string;
  name: string;
  attributes: AttributeType[];
}
