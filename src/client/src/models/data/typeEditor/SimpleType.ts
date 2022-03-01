import { AttributeType } from "./AttributeType";

export interface SimpleType {
  id: string;
  name: string;
  semanticReference: string;
  attributes: AttributeType[];
}
