import {
  Project,
  Aspect,
  Node,
  Edge,
  Attribute,
  Connector,
  ConnectorType,
  RelationType,
  EnumBase,
  Composite,
  Transport,
  Interface,
  SelectType,
  Discipline,
  Purpose,
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
  qualifierId: string;
  sourceId: string;
  conditionId: string;
  formatId: string;
  terminalId: string;
  nodeId: string;
  transportId: string;
  compositeId: string;
  attributeTypeId: string;
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
  visible: boolean;
  nodeId: string;

  // Relation
  relationType: RelationType;

  // Terminal
  color: string;
  terminalCategoryId: string;
  attributes: AttributeAm[];
  terminalTypeId: string;
}
export interface NodeAm {
  id: string;
  iri: string;
  domain: string;
  name: string;
  version: string;
  label: string;
  rds: string;
  contractor: string;
  semanticReference: string;
  tagNumber: string;
  description: string;
  positionX: number;
  positionY: number;
  positionBlockX: number;
  positionBlockY: number;
  width: number;
  height: number;
  cost: number;
  statusId: string;
  masterProjectId: string;
  masterProjectIri: string;
  symbol: string;
  connectors: ConnectorAm[];
  attributes: AttributeAm[];
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
  fromConnectorId: string;
  toConnectorId: string;
  fromNodeId: string;
  toNodeId: string;
  masterProjectId: string;
  masterProjectIri: string;
  transport: TransportAm;
  interface: InterfaceAm;
}

export interface ProjectAm {
  id: string;
  iri: string;
  domain: string;
  name: string;
  isSubProject: boolean;
  version: string;
  description: string;
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
export interface CompositeAm {
  id: string;
  name: string;
  semanticReference: string;
  attributes: AttributeAm[];
  nodeId: string;
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
  let converted = [] as UnitAm[];

  if (!units) return converted;

  units.forEach((unit) => {
    const u = {
      id: unit.id,
      name: unit.name,
      description: unit.description,
      semanticReference: unit.semanticReference,
    } as UnitAm;

    converted.push(u);
  });

  return converted;
};

const ConvertAttributes = (attributes: Attribute[]): AttributeAm[] => {
  let converted = [] as AttributeAm[];

  if (!attributes) return converted;

  attributes.forEach((attribute) => {
    const a = {
      id: attribute.id,
      iri: attribute.iri,
      domain: attribute.domain,
      entity: attribute.entity,
      value: attribute.value,
      selectedUnitId: attribute.selectedUnitId,
      qualifierId: attribute.qualifierId,
      sourceId: attribute.sourceId,
      conditionId: attribute.conditionId,
      formatId: attribute.formatId,
      terminalId: attribute.terminalId,
      nodeId: attribute.nodeId,
      attributeTypeId: attribute.attributeTypeId,
      compositeId: attribute.compositeId,
      units: ConvertUnits(attribute.units),
      selectValues: attribute.selectValues,
      selectType: attribute.selectType,
      discipline: attribute.discipline,
      tags: attribute.tags,
      isLocked: attribute.isLocked,
      isLockedBy: attribute.isLockedBy,
    } as AttributeAm;

    converted.push(a);
  });

  return converted;
};

const ConvertConnectors = (connectors: Connector[]): ConnectorAm[] => {
  let converted = [] as ConnectorAm[];

  if (!connectors) return converted;

  connectors.forEach((connector) => {
    const a = {
      id: connector.id,
      iri: connector.iri,
      domain: connector.domain,
      name: connector.name,
      type: connector.type,
      semanticReference: connector.semanticReference,
      visible: connector.visible,
      nodeId: connector.nodeId,
      relationType: connector.relationType,
      color: connector.color,
      terminalCategoryId: connector.terminalCategoryId,
      attributes: ConvertAttributes(connector.attributes),
      terminalTypeId: connector.terminalTypeId,
    } as ConnectorAm;

    converted.push(a);
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
    visible: connector.visible,
    nodeId: connector.nodeId,
    relationType: connector.relationType,
    color: connector.color,
    terminalCategoryId: connector.terminalCategoryId,
    attributes: ConvertAttributes(connector.attributes),
    terminalTypeId: connector.terminalTypeId,
  } as ConnectorAm;
};

const ConvertComposites = (composites: Composite[]): CompositeAm[] => {
  let converted = [] as CompositeAm[];

  if (!composites) return converted;

  composites.forEach((composite) => {
    const a = {
      id: composite.id,
      name: composite.name,
      semanticReference: composite.semanticReference,
      nodeId: composite.nodeId,
      attributes: ConvertAttributes(composite.attributes),
    } as CompositeAm;
    converted.push(a);
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
  } as TransportAm;
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
  } as InterfaceAm;
};

const ConvertNodes = (nodes: Node[]): NodeAm[] => {
  let convertedNodes = [] as NodeAm[];

  if (!nodes) return convertedNodes;

  nodes.forEach((node) => {
    const n = {
      id: node.id,
      iri: node.iri,
      domain: node.domain,
      name: node.name,
      version: node.version,
      label: node.label,
      rds: node.rds,
      contractor: node.contractor,
      semanticReference: node.semanticReference,
      tagNumber: node.tagNumber,
      description: node.description,
      positionX: node.positionX,
      positionY: node.positionY,
      positionBlockX: node.positionBlockX,
      positionBlockY: node.positionBlockY,
      width: node.width,
      height: node.height,
      cost: node.cost,
      statusId: node.statusId,
      masterProjectId: node.masterProjectId,
      masterProjectIri: node.masterProjectIri,
      symbol: node.symbol,
      connectors: ConvertConnectors(node.connectors),
      attributes: ConvertAttributes(node.attributes),
      composites: ConvertComposites(node.composites),
      aspect: node.aspect,
      isRoot: node.isRoot,
      purpose: node.purpose,
      created: node.created,
      createdBy: node.createdBy,
      updated: node.updated,
      updatedBy: node.updatedBy,
      libraryTypeId: node.libraryTypeId,
      isLocked: node.isLocked,
      IsLockedBy: node.isLockedBy,
    } as NodeAm;

    convertedNodes.push(n);
  });

  return convertedNodes;
};

const ConvertEdges = (edges: Edge[]): EdgeAm[] => {
  let convertedEdges = [] as EdgeAm[];

  if (!edges) return convertedEdges;

  edges.forEach((edge) => {
    const e = {
      id: edge.id,
      iri: edge.iri,
      domain: edge.domain,
      fromConnectorId: edge.fromConnectorId,
      fromNodeId: edge.fromNodeId,
      toConnectorId: edge.toConnectorId,
      toNodeId: edge.toNodeId,
      masterProjectId: edge.masterProjectId,
      masterProjectIri: edge.masterProjectIri,
      transport: ConvertTransport(edge.transport),
      interface: ConvertInterface(edge.interface),
    } as EdgeAm;

    convertedEdges.push(e);
  });

  return convertedEdges;
};

const ConvertProject = (project: Project): ProjectAm => {
  return {
    id: project.id,
    iri: project.iri,
    domain: project.domain,
    name: project.name,
    isSubProject: project.isSubProject,
    version: project.version,
    description: project.description,
    nodes: ConvertNodes(project.nodes),
    edges: ConvertEdges(project.edges),
  } as ProjectAm;
};

export default ConvertProject;
