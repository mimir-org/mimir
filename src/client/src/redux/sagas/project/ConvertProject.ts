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
} from "@mimirorg/modelbuilder-types";

export interface UnitAm {
  id: string;
  name: string;
  description: string;
  semanticReference: string;
}

const ConvertAttributes = (attributes: Attribute[]) => {
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
      units: attribute.units,
      selectValues: attribute.selectValues,
      selectType: attribute.selectType,
      discipline: attribute.discipline,
      isLocked: attribute.isLocked,
      isLockedStatusBy: attribute.isLockedStatusBy,
      isLockedStatusDate: attribute.isLockedStatusDate,
    });
  });

  return converted;
};

const ConvertConnectors = (connectors: Connector[]) => {
  const converted: ConnectorAm[] = [];
  if (!connectors) return converted;

  connectors.forEach((connector) => {
    converted.push({
      id: connector.id,
      iri: connector.iri,
      domain: connector.domain,
      name: connector.name,
      type: connector.type,
      semanticReference: "", //connector.semanticReference, // TODO:fix
      connectorVisibility: connector.connectorVisibility,
      nodeId: connector.nodeId,
      nodeIri: connector.nodeIri,
      //relationType: RelationType.NotSet, // connector.relationType,
      //color: "#000",
      //terminalCategory: "",
      attributes: [], // ConvertAttributes(connector.attributes),
      //terminalTypeId: "", // connector.terminalTypeId,
      //terminalTypeIri: "", // connector.terminalTypeIri,
      isRequired: connector.isRequired,
    });
  });

  return converted;
};

const ConvertTerminal = (terminal: Terminal) => {
  if (!terminal) return {} as TerminalAm;

  return {
    id: terminal.id,
    iri: terminal.iri,
    domain: terminal.domain,
    name: terminal.name,
    type: terminal.type,
    semanticReference: "", // terminal.semanticReference,
    connectorVisibility: terminal.connectorVisibility,
    nodeId: terminal.nodeId,
    nodeIri: terminal.nodeIri,
    relationType: RelationType.NotSet,
    color: terminal.color,
    terminalCategory: terminal.terminalCategory,
    attributes: ConvertAttributes(terminal.attributes),
    terminalTypeId: terminal.terminalTypeId,
    terminalTypeIri: terminal.terminalTypeIri,
    isRequired: terminal.isRequired,
  };
};

const ConvertSimples = (simples: Simple[]) => {
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

const ConvertTransport = (data: Transport) => {
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
    inputTerminal: ConvertTerminal(data.inputTerminal),
    outputTerminalId: data.outputTerminalId,
    outputTerminal: ConvertTerminal(data.outputTerminal),
    updatedBy: data.updatedBy,
    updated: data.updated,
    createdBy: data.createdBy,
    created: data.created,
    libraryTypeId: data.libraryTypeId,
  } as TransportAm;
};

const ConvertInterface = (data: Interface) => {
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
    inputTerminal: ConvertTerminal(data.inputTerminal),
    outputTerminalId: data.outputTerminalId,
    outputTerminal: ConvertTerminal(data.outputTerminal),
    updatedBy: data.updatedBy,
    updated: data.updated,
    createdBy: data.createdBy,
    created: data.created,
    libraryTypeId: data.libraryTypeId,
  } as InterfaceAm;
};

const ConvertNodes = (nodes: Node[]) => {
  const convertedNodes: NodeAm[] = [];
  if (!nodes) return convertedNodes;

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
      attributes: ConvertAttributes(node.attributes),
      simples: ConvertSimples(node.simples),
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
};

const ConvertEdges = (edges: Edge[]) => {
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
      transport: ConvertTransport(edge.transport),
      interface: ConvertInterface(edge.interface),
    } as EdgeAm;

    convertedEdges.push(edgeAm);
  });

  return convertedEdges;
};

const ConvertProject = (project: Project) => {
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
  } as ProjectAm;
};

export default ConvertProject;
