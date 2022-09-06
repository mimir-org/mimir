import { AttributeType } from "./AttributeType";

export interface TerminalType {
  id: string;
  name: string;
  color: string;
  terminalCategoryId: string;
  semanticReference: string;
  attributes: AttributeType[];
}
