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
} from "../../../models/";

export interface UnitAm {
  id: string;
  name: string;
  description: string;
  semanticReference: string;
}
export interface AttributeAm {
  id: string;
  key: string;
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
}
export interface ConnectorAm {
  id: string;
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
  length: number;
  width: number;
  height: number;
  cost: number;
  statusId: string;
  masterProjectId: string;
  symbol: string;
  connectors: ConnectorAm[];
  attributes: AttributeAm[];
  aspect: Aspect;
  isRoot: boolean;
}

export interface EdgeAm {
  id: string;
  fromConnectorId: string;
  toConnectorId: string;
  fromNodeId: string;
  toNodeId: string;
  masterProjectId: string;
  isTemplateEdge: boolean;
  transport: TransportAm;
  interface: InterfaceAm;
}

export interface ProjectAm {
  id: string;
  name: string;
  isSubProject: boolean;
  version: string;
  description: string;
  nodes: NodeAm[];
  edges: EdgeAm[];
}

export interface TransportAm {
  id: string;
  name: string;
  semanticReference: string;
  terminalId: string;
  attributes: AttributeAm[];
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
  name: string;
  semanticReference: string;
  terminalId: string;
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
      key: attribute.key,
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

const ConvertNodes = (nodes: Node[]): NodeAm[] => {
  let convertedNodes = [] as NodeAm[];

  if (!nodes) return convertedNodes;

  nodes.forEach((node) => {
    const n = {
      id: node.id,
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
      length: node.length,
      width: node.width,
      height: node.height,
      cost: node.cost,
      statusId: node.statusId,
      masterProjectId: node.masterProjectId,
      symbol: node.symbol,
      connectors: ConvertConnectors(node.connectors),
      attributes: ConvertAttributes(node.attributes),
      composites: ConvertComposites(node.composites),
      aspect: node.aspect,
      isRoot: node.isRoot,
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
      fromConnectorId: edge.fromConnectorId,
      fromNodeId: edge.fromNodeId,
      toConnectorId: edge.toConnectorId,
      toNodeId: edge.toNodeId,
      masterProjectId: edge.masterProjectId,
      isTemplateEdge: edge.isTemplateEdge,
      transport: edge.transport,
      interface: edge.interface,
    } as EdgeAm;

    convertedEdges.push(e);
  });

  return convertedEdges;
};

const ConvertProject = (project: Project): ProjectAm => {
  return {
    id: project.id,
    name: project.name,
    isSubProject: project.isSubProject,
    version: project.version,
    description: project.description,
    nodes: ConvertNodes(project.nodes),
    edges: ConvertEdges(project.edges),
  } as ProjectAm;
};

export default ConvertProject;
