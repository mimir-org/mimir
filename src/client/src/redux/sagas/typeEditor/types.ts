import { AttributeType } from "../../../models";

export interface SimpleTypeResponse {
  id: string;
  name: string;
  semanticReference: string;
  attributeTypes: AttributeType[];
}
