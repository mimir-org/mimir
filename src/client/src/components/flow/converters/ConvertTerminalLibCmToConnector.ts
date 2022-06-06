import { ConnectorDirection, NodeTerminalLibCm } from "@mimirorg/typelibrary-types";
import { Connector, ConnectorType, ConnectorVisibility, RelationType } from "../../../models";
import { CreateId } from "../helpers";

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
  const direction = ConvertConnectorType(item.connectorDirection);
  const connectorVisibility = SetConnectorVisibility(direction);

  return {
    id: CreateId(),
    iri: item.terminal.iri,
    domain: "",
    name: item.terminal.name,
    type: direction,
    semanticReference: item.terminal.contentReferences[0], // TODO: fix list
    nodeId,
    nodeIri: "",
    connectorVisibility,
    isRequired: false,
    color: item.terminal.color,
    terminalCategory: "",
    attributes: [], // TODO: fix list
    terminalTypeId: "",
    terminalTypeIri: "",
    relationType: RelationType.NotSet,
    kind: item.kind,
  } as Connector;
}

function ConvertConnectorType(connectorDirection: ConnectorDirection) {
  if (connectorDirection === ConnectorDirection.Input) return ConnectorType.Input;
  if (connectorDirection === ConnectorDirection.Output) return ConnectorType.Output;
  if (connectorDirection === ConnectorDirection.Bidirectional) return ConnectorType.Bidirectional;
}

/**
 * Helper function to initialize the correct visibility status for a Connector.
 * @param direction
 * @returns the ConnectorVisibility status.
 */
function SetConnectorVisibility(direction: ConnectorType) {
  if (direction === ConnectorType.Input) return ConnectorVisibility.InputVisible;
  if (direction === ConnectorType.Output) return ConnectorVisibility.OutputVisible;
  return ConnectorVisibility.None;
}
