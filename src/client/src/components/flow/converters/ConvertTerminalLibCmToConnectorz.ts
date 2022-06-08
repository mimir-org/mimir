import { CreateId } from "../helpers";
import { ConvertAttributeLibCmToAttribute } from ".";
import { ConnectorDirection, NodeTerminalLibCm } from "@mimirorg/typelibrary-types";
import { Connector, ConnectorVisibility, RelationType } from "@mimirorg/modelbuilder-types";

const ConvertTerminalLibCmToConnector = (nodeTerminals: NodeTerminalLibCm[], nodeId: string) => {
  const connectors = [] as Connector[];

  nodeTerminals.forEach((t) => {
    const connector = CreateConnector(t, nodeId);
    for (let i = 0; i < t.number; i++) connectors.push(connector);
  });

  return connectors;
};

export default ConvertTerminalLibCmToConnector;

function CreateConnector(item: NodeTerminalLibCm, nodeId: string) {
  const connectorVisibility = SetConnectorVisibility(item.connectorDirection);
  const attributes = ConvertAttributeLibCmToAttribute(item.terminal.attributes);

  return {
    id: CreateId(),
    iri: item.terminal.iri,
    domain: "",
    name: item.terminal.name,
    type: item.connectorDirection,
    semanticReference: item.terminal.contentReferences[0], // TODO: fix list
    nodeId,
    nodeIri: "",
    connectorVisibility,
    isRequired: false,
    color: item.terminal.color,
    terminalCategory: "",
    attributes,
    terminalTypeId: "",
    terminalTypeIri: "",
    relationType: RelationType.NotSet,
    kind: item.kind,
  } as Connector;
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
