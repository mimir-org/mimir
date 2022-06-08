import { CreateId } from "../helpers";
import { ConvertAttributeLibCmToAttribute } from ".";
import { ConnectorDirection, NodeTerminalLibCm } from "@mimirorg/typelibrary-types";
import { Connector, ConnectorVisibility, Terminal } from "@mimirorg/modelbuilder-types";

const ConvertTerminalLibCmToConnector = (nodeTerminals: NodeTerminalLibCm[], nodeId: string) => {
  const connectors = [] as Connector[];

  nodeTerminals.forEach((t) => {
    const connector = CreateTerminal(t, nodeId);
    for (let i = 0; i < t.quantity; i++) connectors.push(connector);
  });

  return connectors;
};

export default ConvertTerminalLibCmToConnector;

function CreateTerminal(item: NodeTerminalLibCm, nodeId: string) {
  const connectorVisibility = SetConnectorVisibility(item.connectorDirection);
  const attributes = ConvertAttributeLibCmToAttribute(item.terminal.attributes);

  return {
    id: CreateId(),
    iri: item.terminal.iri,
    domain: "",
    name: item.terminal.name,
    type: item.connectorDirection,
    nodeId,
    nodeIri: "",
    connectorVisibility,
    isRequired: false,
    color: item.terminal.color,
    terminalCategory: "",
    attributes,
    terminalTypeId: "",
    terminalTypeIri: "",
    kind: item.kind,
    discriminator: "terminal",
  } as Terminal;
}

/**
 * Helper function to initialize the correct visibility status for a Connector.
 * @param direction
 * @returns the ConnectorVisibility status.
 */
function SetConnectorVisibility(direction: ConnectorDirection) {
  if (direction === ConnectorDirection.Input) return ConnectorVisibility.InputVisible;
  if (direction === ConnectorDirection.Output) return ConnectorVisibility.OutputVisible;
  return ConnectorVisibility.None;
}
