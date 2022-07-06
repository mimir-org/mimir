import { CreateId } from "../helpers";
import { ConvertAttributeLibCmToAttribute } from ".";
import { ConnectorDirection, NodeTerminalLibCm } from "@mimirorg/typelibrary-types";
import { Connector, ConnectorVisibility, Relation, RelationType, Terminal } from "@mimirorg/modelbuilder-types";
import { TextResources } from "../../../assets/text/TextResources";

/**
 * Component to convert terminals from NodeTerminalLibCm to Connector.
 * @param nodeTerminals
 * @param nodeId
 * @returns a list of Connectors.
 */
const ConvertTerminalLibCmToConnectors = (nodeTerminals: NodeTerminalLibCm[], nodeId: string) => {
  const connectors = [] as Connector[];

  nodeTerminals.forEach((t) => {
    const terminal = CreateTerminal(t, nodeId);
    const terminalAmount = t.quantity;
    [...Array(terminalAmount)].forEach(() => connectors.push(terminal));
  });

  AddAllRelationConnectors(connectors, nodeId);

  return connectors;
};

export default ConvertTerminalLibCmToConnectors;

/**
 * Function to add all Relation types to a Node.
 * @param connectors
 * @param nodeId
 */
function AddAllRelationConnectors(connectors: Connector[], nodeId: string) {
  connectors.push(CreateRelation(nodeId, RelationType.PartOf, TextResources.PARTOF_RELATIONSHIP, ConnectorDirection.Input));
  connectors.push(CreateRelation(nodeId, RelationType.PartOf, TextResources.PARTOF_RELATIONSHIP, ConnectorDirection.Output));
  connectors.push(CreateRelation(nodeId, RelationType.HasLocation, TextResources.HAS_LOCATION, ConnectorDirection.Input));
  connectors.push(CreateRelation(nodeId, RelationType.HasLocation, TextResources.HAS_LOCATION, ConnectorDirection.Output));
  connectors.push(CreateRelation(nodeId, RelationType.FulfilledBy, TextResources.FULFILLED_BY, ConnectorDirection.Input));
  connectors.push(CreateRelation(nodeId, RelationType.FulfilledBy, TextResources.FULFILLED_BY, ConnectorDirection.Output));
}

/**
 * Function to create a Connector of the Relation type.
 * @param nodeId
 * @param relationType
 * @param connectorDirection
 * @returns a Relation.
 */
function CreateRelation(nodeId: string, relationType: RelationType, name: string, connectorDirection: ConnectorDirection) {
  return {
    id: CreateId(),
    type: connectorDirection,
    nodeId,
    relationType,
    kind: "Connector",
    discriminator: "Relation", // TODO: fix
    name: name,
    domain: "runir.net", // TODO: fix
    isRequired: false,
    connectorVisibility: ConnectorVisibility.None,
  } as Relation;
}

/**
 * Function to create a Terminal based on the NodeTerminalLibCm type.
 * @param item
 * @param nodeId
 * @returns a Terminal
 */
function CreateTerminal(item: NodeTerminalLibCm, nodeId: string) {
  const connectorVisibility = SetConnectorVisibility(item.connectorDirection);
  const attributes = ConvertAttributeLibCmToAttribute(item.terminal.attributes);

  return {
    id: CreateId(),
    iri: item.terminal.iri,
    domain: item.terminal.iri,
    name: item.terminal.name,
    type: item.connectorDirection,
    nodeId,
    nodeIri: "", // TODO: fix
    connectorVisibility,
    isRequired: false,
    color: item.terminal.color,
    terminalCategory: "", // TODO: fix
    attributes,
    terminalTypeId: "", // TODO: fix
    terminalTypeIri: "", // TODO: fix
    kind: item.kind,
    discriminator: "terminal", // TODO: fix
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
