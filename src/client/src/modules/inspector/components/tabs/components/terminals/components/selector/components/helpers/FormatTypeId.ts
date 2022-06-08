import { ConnectorDirection } from "@mimirorg/modelbuilder-types";
import { TerminalType } from "../../../../../../../../../../models";

export const FormatTypeId = (type: TerminalType, connectorType: ConnectorDirection) => `${type.id} ${connectorType}`;
