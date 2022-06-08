import { ConnectorDirection } from "@mimirorg/modelbuilder-types";

export interface TerminalTypeItem {
  terminalId: string;
  terminalTypeId: string;
  selected: boolean;
  connectorType: ConnectorDirection;
  number: number;
  categoryId: string;
}
