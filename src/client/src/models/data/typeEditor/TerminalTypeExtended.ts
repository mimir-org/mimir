import { ConnectorDirection } from "@mimirorg/modelbuilder-types";
import { TerminalType } from "./TerminalType";

export interface TerminalTypeExtended extends TerminalType {
  type: ConnectorDirection;
  terminalTypeId: string;
  number: number;
}
