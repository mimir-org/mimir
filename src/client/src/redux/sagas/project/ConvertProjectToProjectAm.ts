import { IsRelationConnector, IsTerminal } from "../../../components/flow/helpers/Connectors";
import {
  Project,
  Edge,
  Node,
  Attribute,
  AttributeAm,
  Connector,
  Interface,
  ConnectorAm,
  Terminal,
  InterfaceAm,
  TerminalAm,
  TransportAm,
  ProjectAm,
  Transport,
  NodeAm,
  EdgeAm,
  RelationAm,
  Relation,
} from "@mimirorg/modelbuilder-types";

export interface UnitAm {
  id: string;
  name: string;
  description: string;
  semanticReference: string;
}

const ConvertProjectToProjectAm = (project: Project) => {
  return {
    id: project.id,
    iri: project.iri,
    name: project.name,
    isSubProject: project.isSubProject,
    version: project.version,
    description: project.description,
    projectOwner: project.projectOwner,
    nodes: ConvertNodesToNodeAm(project.nodes),
    edges: ConvertEdgesToEdgesAm(project.edges),
  } as ProjectAm;
};

function ConvertNodesToNodeAm(nodes: Node[]) {
  const convertedNodes = [] as NodeAm[];
  if (!nodes?.length) return convertedNodes;

  nodes.forEach((node) => {
    const nodeAm: NodeAm = {
      id: node.id,
      iri: node.iri,
      domain: node.domain,
      projectId: node.projectId,
      projectIri: node.projectIri,
      name: node.name,
      version: node.version,
      label: node.label,
      rds: node.rds,
      description: node.description,
      positionX: node.positionX,
      positionY: node.positionY,
      positionBlockX: node.positionBlockX,
      positionBlockY: node.positionBlockY,
      width: node.width,
      height: node.height,
      masterProjectId: node.masterProjectId,
      masterProjectIri: node.masterProjectIri,
      symbol: node.symbol,
      connectors: ConvertConnectorsToConnectorsAm(node.connectors),
      attributes: ConvertAttributesToAttributesAm(node.attributes),
      aspect: node.aspect,
      nodeType: node.nodeType,
      purpose: node.purposeString,
      created: node.created,
      createdBy: node.createdBy,
      updated: node.updated,
      updatedBy: node.updatedBy,
      libraryTypeId: node.libraryTypeId,
      isLocked: node.isLocked,
      isLockedStatusBy: node.isLockedStatusBy,
      typeReferences: node.typeReferences,
      isLockedStatusDate: undefined,
    };
    convertedNodes.push(nodeAm);
  });

  return convertedNodes;
}

function ConvertEdgesToEdgesAm(edges: Edge[]) {
  const convertedEdges: EdgeAm[] = [];
  if (!edges?.length) return convertedEdges;

  edges.forEach((edge) => {
    const edgeAm: EdgeAm = {
      id: edge.id,
      iri: edge.iri,
      domain: edge.domain,
      projectId: edge.projectId,
      projectIri: edge.projectIri,
      fromConnectorId: edge.fromConnectorId,
      fromNodeId: edge.fromNodeId,
      toConnectorId: edge.toConnectorId,
      toNodeId: edge.toNodeId,
      fromConnectorIri: edge.fromConnectorIri,
      toConnectorIri: edge.toConnectorIri,
      fromNodeIri: edge.fromNodeIri,
      toNodeIri: edge.toNodeIri,
      masterProjectId: edge.masterProjectId,
      masterProjectIri: edge.masterProjectIri,
      transport: ConvertTransportToTransportAm(edge.transport),
      interface: ConvertInterfaceToInterfaceAm(edge.interface),
      isLocked: edge.isLocked,
      isLockedStatusBy: edge.isLockedStatusBy,
      isLockedStatusDate: edge.isLockedStatusDate,
    };
    convertedEdges.push(edgeAm);
  });

  return convertedEdges;
}

function ConvertConnectorsToConnectorsAm(connectors: Connector[]) {
  const convertedConnectors = [] as ConnectorAm[];
  if (!connectors.length) return convertedConnectors;

  connectors.forEach((connector) => {
    if (IsRelationConnector(connector)) convertedConnectors.push(ConvertRelationToRelationAm(connector as Relation));
    else if (IsTerminal(connector)) convertedConnectors.push(ConvertTerminalToTerminalAm(connector as Terminal));
  });

  return convertedConnectors;
}

function ConvertRelationToRelationAm(relation: Relation) {
  if (!relation) return {} as RelationAm;
  const rel: RelationAm = {
    id: relation.id,
    iri: relation.iri,
    domain: relation.domain,
    name: relation.name,
    connectorVisibility: relation.connectorVisibility,
    isRequired: relation.isRequired,
    nodeId: relation.nodeId,
    nodeIri: relation.nodeIri,
    type: relation.type,
    relationType: relation.relationType,
  };
  return rel;
}

function ConvertTerminalToTerminalAm(terminal: Terminal) {
  if (!terminal) return {} as TerminalAm;
  const term: TerminalAm = {
    id: terminal.id,
    iri: terminal.iri,
    domain: terminal.domain,
    name: terminal.name,
    type: terminal.type,
    connectorVisibility: terminal.connectorVisibility,
    nodeId: terminal.nodeId,
    nodeIri: terminal.nodeIri,
    color: terminal.color,
    terminalParentTypeName: terminal.terminalParentTypeName,
    attributes: ConvertAttributesToAttributesAm(terminal.attributes),
    terminalTypeId: terminal.terminalTypeId,
    terminalTypeIri: terminal.terminalTypeIri,
    isRequired: terminal.isRequired,
    isProxy: terminal.isProxy,
    typeReferences: terminal.typeReferences,
    proxyParent: terminal.proxyParent,
    proxySibling: terminal.proxySibling,
    terminalParentTypeId: terminal.terminalParentTypeId,
    terminalParentTypeIri: terminal.terminalParentTypeIri,
  };
  return term;
}

function ConvertAttributesToAttributesAm(attributes: Attribute[]) {
  const convertedAttributes = [] as AttributeAm[];
  if (!attributes?.length) return convertedAttributes;

  attributes.forEach((attr) => {
    convertedAttributes.push({
      id: attr.id,
      iri: attr.iri,
      entity: attr.entity,
      value: attr.value,
      selectedUnitId: attr.selectedUnitId,
      specifiedScope: attr.specifiedScope,
      specifiedProvenance: attr.specifiedProvenance,
      rangeSpecifying: attr.rangeSpecifying,
      regularitySpecified: attr.regularitySpecified,
      terminalId: attr.terminalId,
      terminalIri: attr.terminalIri,
      nodeId: attr.nodeId,
      nodeIri: attr.nodeIri,
      transportId: attr.transportId,
      transportIri: attr.transportIri,
      interfaceId: attr.interfaceId,
      interfaceIri: attr.interfaceIri,
      attributeTypeId: attr.attributeTypeId,
      attributeTypeIri: attr.attributeTypeIri,
      units: attr.units,
      isLocked: attr.isLocked,
      isLockedStatusBy: attr.isLockedStatusBy,
      isLockedStatusDate: attr.isLockedStatusDate,
    });
  });

  return convertedAttributes;
}

function ConvertTransportToTransportAm(data: Transport) {
  if (!data) return null;

  return {
    id: data.id,
    version: data.version,
    rds: data.rds,
    name: data.name,
    label: data.label,
    description: data.description,
    attributes: ConvertAttributesToAttributesAm(data.attributes),
    inputTerminalId: data.inputTerminalId,
    inputTerminal: ConvertTerminalToTerminalAm(data.inputTerminal),
    outputTerminalId: data.outputTerminalId,
    outputTerminal: ConvertTerminalToTerminalAm(data.outputTerminal),
    updatedBy: data.updatedBy,
    updated: data.updated,
    createdBy: data.createdBy,
    created: data.created,
    libraryTypeId: data.libraryTypeId,
  } as TransportAm;
}

function ConvertInterfaceToInterfaceAm(data: Interface) {
  if (!data) return null;

  return {
    id: data.id,
    version: data.version,
    rds: data.rds,
    name: data.name,
    label: data.label,
    description: data.description,
    attributes: ConvertAttributesToAttributesAm(data.attributes),
    inputTerminalId: data.inputTerminalId,
    inputTerminal: ConvertTerminalToTerminalAm(data.inputTerminal),
    outputTerminalId: data.outputTerminalId,
    outputTerminal: ConvertTerminalToTerminalAm(data.outputTerminal),
    updatedBy: data.updatedBy,
    updated: data.updated,
    createdBy: data.createdBy,
    created: data.created,
    libraryTypeId: data.libraryTypeId,
  } as InterfaceAm;
}

export default ConvertProjectToProjectAm;
