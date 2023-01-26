import { CreateId } from "../helpers";
import { ConnectorDirection, NodeTerminalLibCm, TerminalLibCm } from "@mimirorg/typelibrary-types";
import { TextResources } from "../../../assets/text/TextResources";
import { ConvertTerminalAttributeLibCmToAttribute } from "./ConvertAttributeLibCmToAttribute";
import { ConvertTypeReference } from "./ConvertTypeReference";
import { Aspect, Connector, ConnectorVisibility, Relation, RelationType, Terminal } from "@mimirorg/modelbuilder-types";

/**
 * Component to convert terminals from NodeTerminalLibCm to Connector.
 * This operation is needed when a LibNode is dropped from the Library and converted to a Node.
 * The LibNode's terminals are of the the type NodeTerminalLibCm.
 * @param libTerminals - the libTerminals belonging to the libNode
 * @param nodeId
 * @param nodeIri
 * @param allTerminals - all the terminals in the Project
 * @returns a list of Mimir Connectors.
 */
const ConvertTerminalLibCmToConnectors = (
  libTerminals: NodeTerminalLibCm[],
  nodeId: string,
  nodeIri: string,
  allTerminals: TerminalLibCm[],
  aspect: Aspect
) => {
  const connectors = [] as Connector[];

  // Convert all existing libTerminals
  libTerminals.forEach((t) => {
    const terminalAmount = t.minQuantity;
    [...Array(terminalAmount)].forEach(() => connectors.push(CreateTerminal(t, nodeId, nodeIri, allTerminals)));
  });

  // Create all mandatory relation connectors
  CreateRelationConnectors(connectors, nodeId, nodeIri, aspect);

  return connectors;
};

export default ConvertTerminalLibCmToConnectors;

/**
 * Function to create a Terminal based on the NodeTerminalLibCm type.
 * @param libTerminal
 * @param nodeId
 * @param nodeIri
 * @param allTerminals
 * @returns a Terminal.
 */
function CreateTerminal(libTerminal: NodeTerminalLibCm, nodeId: string, nodeIri: string, allTerminals: TerminalLibCm[]) {
  const id = CreateId();
  const terminalCategory = GetTerminalCategoryName(libTerminal.terminal, allTerminals);
  const attributes = ConvertTerminalAttributeLibCmToAttribute(libTerminal.terminal, id);

  const terminal: Terminal = {
    id,
    iri: null,
    domain: libTerminal.terminal.iri,
    name: libTerminal.terminal.name,
    type: libTerminal.connectorDirection,
    nodeId,
    nodeIri,
    connectorVisibility: ConnectorVisibility.None,
    isRequired: false,
    color: libTerminal.terminal.color,
    terminalParentTypeName: terminalCategory,
    attributes,
    terminalTypeId: libTerminal.terminal.id,
    terminalTypeIri: libTerminal.terminal.iri,
    kind: TextResources.KIND_TERMINAL,
    discriminator: null,
    typeReferences: ConvertTypeReference(libTerminal.terminal.typeReferences),
    terminalParentTypeId: libTerminal.terminal.parentId,
    terminalParentTypeIri: libTerminal.terminal.parentIri,
    isProxy: false,
    proxyParent: null,
    proxySibling: null,
  };

  return terminal;
}

export const GetTerminalCategoryName = (libTerminal: TerminalLibCm, allTerminals: TerminalLibCm[]) => {
  if (libTerminal.parentName == null) {
    return libTerminal.name;
  }
  // Recursive traversal to find parent
  const parentTerminal = allTerminals.find((t) => t.name === libTerminal.parentName);
  return GetTerminalCategoryName(parentTerminal, allTerminals);
};

/**
 * Function to add all Relation types to a Node.
 * All Nodes in Mimir have these six relations by default.
 * @param connectors
 * @param nodeId
 * @param nodeIri
 */
function CreateRelationConnectors(connectors: Connector[], nodeId: string, nodeIri: string, aspect: Aspect) {
  connectors.push(CreateRelation(nodeId, nodeIri, RelationType.PartOf, TextResources.PARTOF_RELATIONSHIP, true));
  connectors.push(CreateRelation(nodeId, nodeIri, RelationType.PartOf, TextResources.PARTOF_RELATIONSHIP));

  if (aspect === Aspect.Location) {
    connectors.push(CreateRelation(nodeId, nodeIri, RelationType.HasLocation, TextResources.HAS_LOCATION, true));
  }

  if (aspect === Aspect.Product) {
    connectors.push(CreateRelation(nodeId, nodeIri, RelationType.FulfilledBy, TextResources.FULFILLED_BY, true));
    connectors.push(CreateRelation(nodeId, nodeIri, RelationType.HasLocation, TextResources.HAS_LOCATION));
  }

  if (aspect === Aspect.Function) {
    connectors.push(CreateRelation(nodeId, nodeIri, RelationType.HasLocation, TextResources.HAS_LOCATION));
    connectors.push(CreateRelation(nodeId, nodeIri, RelationType.FulfilledBy, TextResources.FULFILLED_BY));
  }
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
    kind: TextResources.KIND_RELATION,
    discriminator: TextResources.KIND_RELATION,
    name,
    isRequired: false,
    connectorVisibility: isInput ? ConnectorVisibility.InputVisible : ConnectorVisibility.OutputVisible,
    iri: null,
  } as Relation;
}
