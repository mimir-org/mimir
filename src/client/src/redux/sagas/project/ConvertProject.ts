import {
  Aspect,
  Attribute,
  Connector,
  ConnectorType,
  Discipline,
  Edge,
  EnumBase,
  Interface,
  Node,
  Project,
  Purpose,
  RelationType,
  SelectType,
  Simple,
  Transport,
  ConnectorVisibility,
} from "../../../models/";

export interface UnitAm {
  id: string;
  name: string;
  description: string;
  semanticReference: string;
}

export interface AttributeAm {
  id: string;
  iri: string;
  domain: string;
  entity: string;
  value: string;
  selectedUnitId: string;
  qualifier: string;
  source: string;
  condition: string;
  format: string;
  terminalId: string;
  terminalIri: string;
  nodeId: string;
  nodeIri: string;
  transportId: string;
  transportIri: string;
  interfaceId: string;
  interfaceIri: string;
  simpleId: string;
  simpleIri: string;
  attributeTypeId: string;
  attributeTypeIri: string;
  units: UnitAm[];
  selectValues: string[];
  selectType: SelectType;
  discipline: Discipline;
  tags: Set<string>;
  isLocked: boolean;
  isLockedBy: string;
}

export interface ConnectorAm {
  id: string;
  iri: string;
  domain: string;
  name: string;
  type: ConnectorType;
  semanticReference: string;
  connectorVisibility: ConnectorVisibility;
  nodeId: string;
  nodeIri: string;
  isRequired: boolean;

  // Relation
  relationType: RelationType;

  // Terminal
  color: string;
  terminalCategoryId: string;
  attributes: AttributeAm[];
  terminalTypeId: string;
  terminalTypeIri: string;
}

export interface NodeAm {
  id: string;
  iri: string;
  domain: string;
  projectId: string;
  projectIri: string;
  name: string;
  version: string;
  label: string;
  rds: string;
  semanticReference: string;
  tagNumber: string;
  description: string;
  positionX: number;
  positionY: number;
  positionBlockX: number;
  positionBlockY: number;
  width: number;
  height: number;
  statusId: string;
  masterProjectId: string;
  masterProjectIri: string;
  symbol: string;
  connectors: ConnectorAm[];
  attributes: AttributeAm[];
  simples: SimpleAm[];
  aspect: Aspect;
  isRoot: boolean;
  purpose: Purpose;
  created: Date;
  createdBy: string;
  updated: Date;
  updatedBy: string;
  libraryTypeId: string;
  isLocked: boolean;
  IsLockedBy: string;
}

export interface EdgeAm {
  id: string;
  iri: string;
  domain: string;
  projectId: string;
  projectIri: string;
  fromConnectorId: string;
  toConnectorId: string;
  fromNodeId: string;
  toNodeId: string;
  fromConnectorIri: string;
  toConnectorIri: string;
  fromNodeIri: string;
  toNodeIri: string;
  masterProjectId: string;
  masterProjectIri: string;
  transport: TransportAm;
  interface: InterfaceAm;
}

export interface ProjectAm {
  id: string;
  iri: string;
  name: string;
  isSubProject: boolean;
  version: string;
  description: string;
  projectOwner: string;
  nodes: NodeAm[];
  edges: EdgeAm[];
}

export interface TransportAm {
  id: string;
  version: string;
  rds: string;
  name: string;
  label: string;
  description: string;
  statusId: string;
  semanticReference: string;
  attributes: AttributeAm[];
  inputTerminalId: string;
  inputTerminal: ConnectorAm;
  outputTerminalId: string;
  outputTerminal: ConnectorAm;
  updatedBy: string;
  updated: Date;
  createdBy: string;
  created: Date;
  libraryTypeId: string;
}

export interface SimpleAm {
  id: string;
  iri: string;
  name: string;
  attributes: AttributeAm[];
  nodeId: string;
  nodeIri: string;
}

export interface InterfaceAm {
  id: string;
  version: string;
  rds: string;
  name: string;
  label: string;
  description: string;
  statusId: string;
  semanticReference: string;
  attributes: AttributeAm[];
  inputTerminalId: string;
  inputTerminal: ConnectorAm;
  outputTerminalId: string;
  outputTerminal: ConnectorAm;
  updatedBy: string;
  updated: Date;
  createdBy: string;
  created: Date;
  libraryTypeId: string;
}

const ConvertUnits = (units: EnumBase[]): UnitAm[] => {
  const converted: UnitAm[] = [];

  if (!units) return converted;

  units.forEach((unit) => {
    converted.push({
      id: unit.id,
      name: unit.name,
      description: unit.description,
      semanticReference: unit.semanticReference,
    });
  });

  return converted;
};

const ConvertAttributes = (attributes: Attribute[]): AttributeAm[] => {
  const converted: AttributeAm[] = [];

  if (!attributes) return converted;

  attributes.forEach((attribute) => {
    converted.push({
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
      units: ConvertUnits(attribute.units),
      selectValues: attribute.selectValues,
      selectType: attribute.selectType,
      discipline: attribute.discipline,
      tags: attribute.tags,
      isLocked: attribute.isLocked,
      isLockedBy: attribute.isLockedStatusBy,
    });
  });

  return converted;
};

const ConvertConnectors = (connectors: Connector[]): ConnectorAm[] => {
  const converted: ConnectorAm[] = [];

  if (!connectors) return converted;

  connectors.forEach((connector) => {
    converted.push({
      id: connector.id,
      iri: connector.iri,
      domain: connector.domain,
      name: connector.name,
      type: connector.type,
      semanticReference: connector.semanticReference,
      connectorVisibility: connector.connectorVisibility,
      nodeId: connector.nodeId,
      nodeIri: connector.nodeIri,
      relationType: connector.relationType,
      color: connector.color,
      terminalCategoryId: connector.terminalCategoryId,
      attributes: ConvertAttributes(connector.attributes),
      terminalTypeId: connector.terminalTypeId,
      terminalTypeIri: connector.terminalTypeIri,
      isRequired: connector.isRequired,
    });
  });

  return converted;
};

const ConvertConnector = (connector: Connector): ConnectorAm => {
  if (!connector) return {} as ConnectorAm;
  return {
    id: connector.id,
    iri: connector.iri,
    domain: connector.domain,
    name: connector.name,
    type: connector.type,
    semanticReference: connector.semanticReference,
    connectorVisibility: connector.connectorVisibility,
    nodeId: connector.nodeId,
    nodeIri: connector.nodeIri,
    relationType: connector.relationType,
    color: connector.color,
    terminalCategoryId: connector.terminalCategoryId,
    attributes: ConvertAttributes(connector.attributes),
    terminalTypeId: connector.terminalTypeId,
    terminalTypeIri: connector.terminalTypeIri,
    isRequired: connector.isRequired,
  };
};

const ConvertSimples = (simples: Simple[]): SimpleAm[] => {
  const converted: SimpleAm[] = [];

  if (!simples) return converted;

  simples.forEach((simple) => {
    converted.push({
      id: simple.id,
      iri: simple.iri,
      name: simple.name,
      nodeId: simple.nodeId,
      nodeIri: simple.nodeIri,
      attributes: ConvertAttributes(simple.attributes),
    });
  });

  return converted;
};

const ConvertTransport = (data: Transport): TransportAm => {
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
    attributes: ConvertAttributes(data.attributes),
    inputTerminalId: data.inputTerminalId,
    inputTerminal: ConvertConnector(data.inputTerminal),
    outputTerminalId: data.outputTerminalId,
    outputTerminal: ConvertConnector(data.outputTerminal),
    updatedBy: data.updatedBy,
    updated: data.updated,
    createdBy: data.createdBy,
    created: data.created,
    libraryTypeId: data.libraryTypeId,
  };
};

const ConvertInterface = (data: Interface): InterfaceAm => {
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
    attributes: ConvertAttributes(data.attributes),
    inputTerminalId: data.inputTerminalId,
    inputTerminal: ConvertConnector(data.inputTerminal),
    outputTerminalId: data.outputTerminalId,
    outputTerminal: ConvertConnector(data.outputTerminal),
    updatedBy: data.updatedBy,
    updated: data.updated,
    createdBy: data.createdBy,
    created: data.created,
    libraryTypeId: data.libraryTypeId,
  };
};

const ConvertNodes = (nodes: Node[]): NodeAm[] => {
  const convertedNodes: NodeAm[] = [];

  if (!nodes) return convertedNodes;

  nodes.forEach((node) => {
    convertedNodes.push({
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
      tagNumber: node.tagNumber,
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
      attributes: ConvertAttributes(node.attributes),
      simples: ConvertSimples(node.simples),
      aspect: node.aspect,
      isRoot: node.isRoot,
      purpose: node.purpose,
      created: node.created,
      createdBy: node.createdBy,
      updated: node.updated,
      updatedBy: node.updatedBy,
      libraryTypeId: node.libraryTypeId,
      isLocked: node.isLocked,
      IsLockedBy: node.isLockedStatusBy,
    });
  });

  return convertedNodes;
};

const ConvertEdges = (edges: Edge[]): EdgeAm[] => {
  const convertedEdges: EdgeAm[] = [];

  if (!edges) return convertedEdges;

  edges.forEach((edge) => {
    convertedEdges.push({
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
      transport: ConvertTransport(edge.transport),
      interface: ConvertInterface(edge.interface),
    });
  });

  return convertedEdges;
};

const ConvertProject = (project: Project): ProjectAm => {
  return {
    id: project.id,
    iri: project.iri,
    name: project.name,
    isSubProject: project.isSubProject,
    version: project.version,
    description: project.description,
    projectOwner: project.projectOwner,
    nodes: ConvertNodes(project.nodes),
    edges: ConvertEdges(project.edges),
  };
};

export default ConvertProject;
