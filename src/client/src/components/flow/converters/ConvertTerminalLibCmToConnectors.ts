import { CreateId } from "../helpers";
import { ConnectorDirection, NodeTerminalLibCm } from "@mimirorg/typelibrary-types";
import { Connector, ConnectorVisibility, Relation, RelationType, Terminal } from "@mimirorg/modelbuilder-types";
import { TextResources } from "../../../assets/text/TextResources";
import { ConvertTerminalAttributeLibCmToAttribute } from "./ConvertAttributeLibCmToAttribute";

/**
 * Component to convert terminals from NodeTerminalLibCm to Connector.
 * This operation is needed when a LibNode is dropped from the Library and converted to a Node.
 * The LibNode's terminals are of the the type NodeTerminalLibCm.
 * @param libTerminals
 * @param nodeId
 * @param nodeIri
 * @returns a list of Mimir Connectors.
 */
const ConvertTerminalLibCmToConnectors = (libTerminals: NodeTerminalLibCm[], nodeId: string, nodeIri: string) => {
  const connectors = [] as Connector[];

  // Convert all existing libTerminals
  libTerminals.forEach((t) => {
    const terminalAmount = t.quantity;
    [...Array(terminalAmount)].forEach(() => connectors.push(CreateTerminal(t, nodeId, nodeIri)));
  });

  // Create all mandatory relation connectors
  CreateRelationConnectors(connectors, nodeId, nodeIri);

  return connectors;
};

export default ConvertTerminalLibCmToConnectors;

/**
 * Function to create a Terminal based on the NodeTerminalLibCm type.
 * @param libTerminal
 * @param nodeId
 * @param nodeIri
 * @returns a Terminal.
 */
function CreateTerminal(libTerminal: NodeTerminalLibCm, nodeId: string, nodeIri: string) {
  const connectorVisibility = SetConnectorVisibility(libTerminal.connectorDirection);
  const attributes = ConvertTerminalAttributeLibCmToAttribute(libTerminal.terminal, nodeId, nodeIri);

  return {
    id: CreateId(),
    iri: null,
    domain: libTerminal.terminal.iri,
    name: libTerminal.terminal.name,
    type: libTerminal.connectorDirection,
    nodeId,
    nodeIri,
    connectorVisibility,
    isRequired: false,
    color: libTerminal.terminal.color,
    terminalCategory: libTerminal.terminal.parentName,
    attributes,
    terminalTypeId: libTerminal.terminal.id,
    terminalTypeIri: libTerminal.terminal.iri,
    kind: libTerminal.kind,
    discriminator: TextResources.KIND_TERMINAL,
  } as Terminal;
}

/**
 * Function to add all Relation types to a Node.
 * All Nodes in Mimir have these six relations by default.
 * @param connectors
 * @param nodeId
 * @param nodeIri
 */
function CreateRelationConnectors(connectors: Connector[], nodeId: string, nodeIri: string) {
  connectors.push(CreateRelation(nodeId, nodeIri, RelationType.PartOf, TextResources.PARTOF_RELATIONSHIP, true));
  connectors.push(CreateRelation(nodeId, nodeIri, RelationType.PartOf, TextResources.PARTOF_RELATIONSHIP));
  connectors.push(CreateRelation(nodeId, nodeIri, RelationType.HasLocation, TextResources.HAS_LOCATION, true));
  connectors.push(CreateRelation(nodeId, nodeIri, RelationType.HasLocation, TextResources.HAS_LOCATION));
  connectors.push(CreateRelation(nodeId, nodeIri, RelationType.FulfilledBy, TextResources.FULFILLED_BY, true));
  connectors.push(CreateRelation(nodeId, nodeIri, RelationType.FulfilledBy, TextResources.FULFILLED_BY));
}

/**
 * Function to create a Connector of the Relation type.
 * @param nodeId
 * @param nodeIri
 * @param relationType
 * @param isInput
 * @returns a Relation.
 */
function CreateRelation(nodeId: string, nodeIri: string, relationType: RelationType, name: string, isInput?: boolean) {
  return {
    id: CreateId(),
    type: isInput ? ConnectorDirection.Input : ConnectorDirection.Output,
    nodeId,
    nodeIri,
    relationType,
    kind: TextResources.KIND_CONNECTOR,
    discriminator: TextResources.KIND_RELATION,
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
