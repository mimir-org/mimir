import { ConnectorType } from "../../enums/ConnectorType";

export interface TerminalTypeItem {
  terminalId: string;
  terminalTypeId: string;
  selected: boolean | false;
  connectorType: ConnectorType;
  number: number;
  categoryId: string;
}
