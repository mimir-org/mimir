import { EnumBase } from "../../enums/EnumBase";
import { AttributeType } from "./AttributeType";

export interface TerminalType {
  id: string;
  name: string;
  color: string;
  terminalCategoryId: string;
  terminalCategory: EnumBase;
  semanticReference: string;
  attributes: AttributeType[];
}
