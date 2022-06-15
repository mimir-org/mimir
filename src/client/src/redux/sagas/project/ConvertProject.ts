import { IsRelationConnector, IsTerminal } from "../../../components/flow/helpers/Connectors";
import {
  Project,
  Edge,
  Node,
  Attribute,
  AttributeAm,
  Connector,
  Interface,
  Simple,
  SimpleAm,
  ConnectorAm,
  Terminal,
  InterfaceAm,
  TerminalAm,
  TransportAm,
  ProjectAm,
  Transport,
  NodeAm,
  EdgeAm,
  RelationType,
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
  const convertedNodes: NodeAm[] = [];
  if (!nodes.length) return convertedNodes;

  nodes.forEach((node) => {
    const nodeAm = {
      id: node.id,
      iri: node.iri,
      domain: node.domain,
      projectId: node.projectId,
      projectIri: node.projectIri,
      name: node.name,
      version: node.version,
      label: node.label,
      rds: node.rds,
      semanticReference: node.semanticReference,
      description: node.description,
      positionX: node.positionX,
      positionY: node.positionY,
      positionBlockX: node.positionBlockX,
      positionBlockY: node.positionBlockY,
      width: node.width,
      height: node.height,
      statusId: node.statusId,
      masterProjectId: node.masterProjectId,
      masterProjectIri: node.masterProjectIri,
      symbol: node.symbol,
      connectors: ConvertConnectors(node.connectors),
      attributes: ConvertAttributesToAttributesAm(node.attributes),
      simples: ConvertSimplesToSimplesAm(node.simples),
      aspect: node.aspect,
      isRoot: node.isRoot,
      purpose: node.purposeString,
      created: node.created,
      createdBy: node.createdBy,
      updated: node.updated,
      updatedBy: node.updatedBy,
      libraryTypeId: node.libraryTypeId,
      isLocked: node.isLocked,
      isLockedStatusBy: node.isLockedStatusBy,
    } as NodeAm;

    convertedNodes.push(nodeAm);
  });

  return convertedNodes;
}

function ConvertEdgesToEdgesAm(edges: Edge[]) {
  const convertedEdges: EdgeAm[] = [];
  if (!edges) return convertedEdges;

  edges.forEach((edge) => {
    const edgeAm = {
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
    } as EdgeAm;

    convertedEdges.push(edgeAm);
  });

  return convertedEdges;
}

function ConvertConnectors(connectors: Connector[]) {
  if (!connectors.length) return [];

  const convertedConnectors = [] as ConnectorAm[];

  connectors.forEach((connector) => {
    if (IsRelationConnector(connector)) convertedConnectors.push(ConvertRelationToRelationAm(connector));
    else if (IsTerminal(connector)) convertedConnectors.push(ConvertTerminalToTerminalAm(connector));
  });

  return convertedConnectors;
}

function ConvertRelationToRelationAm(relation: Relation) {
  if (!relation) return {} as RelationAm;

  return {
    id: relation.id,
    iri: relation.iri,
    domain: relation.domain,
    name: relation.name,
    attributes: [],
    connectorVisibility: relation.connectorVisibility,
    isRequired: relation.isRequired,
    nodeId: relation.nodeId,
    nodeIri: relation.nodeIri,
    semanticReference: "",
    type: relation.type,
    relationType: relation.relationType,
  } as RelationAm;
}

function ConvertTerminalToTerminalAm(terminal: Terminal) {
  if (!terminal) return {} as TerminalAm;

  return {
    id: terminal.id,
    iri: terminal.iri,
    domain: terminal.domain,
    name: terminal.name,
    type: terminal.type,
    semanticReference: "", // terminal.semanticReference, // TODO: fix
    connectorVisibility: terminal.connectorVisibility,
    nodeId: terminal.nodeId,
    nodeIri: terminal.nodeIri,
    relationType: RelationType.NotSet,
    color: terminal.color,
    terminalCategory: terminal.terminalCategory,
    attributes: ConvertAttributesToAttributesAm(terminal.attributes),
    terminalTypeId: terminal.terminalTypeId,
    terminalTypeIri: terminal.terminalTypeIri,
    isRequired: terminal.isRequired,
  };
}

function ConvertAttributesToAttributesAm(attributes: Attribute[]) {
  const convertedAttributes: AttributeAm[] = [];
  if (!attributes.length) return convertedAttributes;

  attributes.forEach((attribute) => {
    convertedAttributes.push({
      id: attribute.id,
      iri: attribute.iri,
      domain: attribute.domain,
      entity: attribute.entity,
      value: attribute.value,
      selectedUnitId: attribute.selectedUnitId,
      qualifier: attribute.qualifier,
      source: attribute.source,
      condition: attribute.condition,
      format: attribute.format,
      terminalId: attribute.terminalId,
      terminalIri: attribute.terminalIri,
      nodeId: attribute.nodeId,
      nodeIri: attribute.nodeIri,
      transportId: attribute.transportId,
      transportIri: attribute.transportIri,
      interfaceId: attribute.interfaceId,
      interfaceIri: attribute.interfaceIri,
      attributeTypeId: attribute.attributeTypeId,
      attributeTypeIri: attribute.attributeTypeIri,
      simpleId: attribute.simpleId,
      simpleIri: attribute.simpleIri,
      units: attribute.units,
      selectValues: attribute.selectValues,
      selectType: attribute.selectType,
      discipline: attribute.discipline,
      isLocked: attribute.isLocked,
      isLockedStatusBy: attribute.isLockedStatusBy,
      isLockedStatusDate: attribute.isLockedStatusDate,
    });
  });

  return convertedAttributes;
}

function ConvertSimplesToSimplesAm(simples: Simple[]) {
  const converted: SimpleAm[] = [];
  if (!simples) return converted;

  simples.forEach((simple) => {
    converted.push({
      id: simple.id,
      iri: simple.iri,
      name: simple.name,
      nodeId: simple.nodeId,
      nodeIri: simple.nodeIri,
      attributes: ConvertAttributesToAttributesAm(simple.attributes),
    });
  });

  return converted;
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
    statusId: data.statusId,
    semanticReference: data.semanticReference,
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
    statusId: data.statusId,
    semanticReference: data.semanticReference,
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
