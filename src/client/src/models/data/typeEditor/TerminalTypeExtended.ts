import { TerminalType } from "./TerminalType";
import { ConnectorType } from "../../enums/ConnectorType";

export interface TerminalTypeExtended extends TerminalType {
  type: ConnectorType;
  terminalTypeId: string;
  number: number;
}
