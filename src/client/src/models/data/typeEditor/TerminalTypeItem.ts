import { ConnectorType } from "../../enums/ConnectorType";

export interface TerminalTypeItem {
  terminalId: string;
  terminalTypeId: string;
  selected: boolean;
  connectorType: ConnectorType;
  number: number;
  categoryId: string;
}
