import { ConnectorType, TerminalType } from "../../../../../models";

export const FormatTypeId = (type: TerminalType, connectorType: ConnectorType) => `${type.id} ${connectorType}`;
