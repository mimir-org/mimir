import { CreateId } from "../helpers";
import { ConvertAttributeLibCmToAttribute } from ".";
import { ConnectorDirection, NodeTerminalLibCm } from "@mimirorg/typelibrary-types";
import { Connector, ConnectorVisibility, Relation, RelationType, Terminal } from "@mimirorg/modelbuilder-types";
import { TextResources } from "../../../assets/text/TextResources";

/**
 * Component to convert terminals from NodeTerminalLibCm to Connector.
 * This operation is needed when a LibNode is dropped from the Library and converted to a Node.
 * @param libTerminals
 * @param nodeId
 * @param nodeIri
 * @returns a list of Mimir Connectors.
 */
const ConvertTerminalLibCmToConnectors = (libTerminals: NodeTerminalLibCm[], nodeId: string, nodeIri: string) => {
  const connectors = [] as Connector[];

  // Convert all existing terminals
  libTerminals.forEach((t) => {
    const terminal = CreateTerminal(t, nodeId, nodeIri);
    const terminalAmount = t.quantity;
    [...Array(terminalAmount)].forEach(() => connectors.push(terminal));
  });

  AddRelationConnectors(connectors, nodeId, nodeIri);

  return connectors;
};

export default ConvertTerminalLibCmToConnectors;

/**
 * Function to create a Terminal based on the NodeTerminalLibCm type.
 * @param item
 * @param nodeId
 * @param nodeIri
 * @returns a Terminal.
 */
function CreateTerminal(item: NodeTerminalLibCm, nodeId: string, nodeIri: string) {
  const connectorVisibility = SetConnectorVisibility(item.connectorDirection);
  const attributes = ConvertAttributeLibCmToAttribute(item.terminal.attributes);

  return {
    id: CreateId(),
    iri: item.terminal.iri,
    domain: item.terminal.iri,
    name: item.terminal.name,
    type: item.connectorDirection,
    nodeId,
    nodeIri,
    connectorVisibility,
    isRequired: false,
    color: item.terminal.color,
    terminalCategory: item.terminal.parentName,
    attributes,
    terminalTypeId: item.terminal.id,
    terminalTypeIri: item.terminal.iri,
    kind: item.kind,
    discriminator: "Terminal",
  } as Terminal;
}

/**
 * Function to add all Relation types to a Node.
 * All Nodes in Mimir have these six relations by default.
 * @param connectors
 * @param nodeId
 * @param nodeIri
 */
function AddRelationConnectors(connectors: Connector[], nodeId: string, nodeIri: string) {
  connectors.push(
    CreateRelation(nodeId, nodeIri, RelationType.PartOf, TextResources.PARTOF_RELATIONSHIP, ConnectorDirection.Input)
  );
  connectors.push(
    CreateRelation(nodeId, nodeIri, RelationType.PartOf, TextResources.PARTOF_RELATIONSHIP, ConnectorDirection.Output)
  );
  connectors.push(
    CreateRelation(nodeId, nodeIri, RelationType.HasLocation, TextResources.HAS_LOCATION, ConnectorDirection.Input)
  );
  connectors.push(
    CreateRelation(nodeId, nodeIri, RelationType.HasLocation, TextResources.HAS_LOCATION, ConnectorDirection.Output)
  );
  connectors.push(
    CreateRelation(nodeId, nodeIri, RelationType.FulfilledBy, TextResources.FULFILLED_BY, ConnectorDirection.Input)
  );
  connectors.push(
    CreateRelation(nodeId, nodeIri, RelationType.FulfilledBy, TextResources.FULFILLED_BY, ConnectorDirection.Output)
  );
}

/**
 * Function to create a Connector of the Relation type.
 * @param nodeId
 * @param nodeIri
 * @param relationType
 * @param connectorDirection
 * @returns a Relation.
 */
function CreateRelation(
  nodeId: string,
  nodeIri: string,
  relationType: RelationType,
  name: string,
  connectorDirection: ConnectorDirection
) {
  return {
    id: CreateId(),
    type: connectorDirection,
    nodeId,
    nodeIri,
    relationType,
    kind: "Connector",
    discriminator: "Relation",
    name,
    isRequired: false,
    connectorVisibility: ConnectorVisibility.None,
    iri: null,
  } as Relation;
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
