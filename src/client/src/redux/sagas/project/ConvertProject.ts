import { Project, Aspect, Node, Edge, Attribute, Connector, ConnectorType, RelationType, EnumBase } from "../../../models/";

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
    statusId: string;
    masterProjectId: string;
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
}

export interface ProjectAm {
    name: string;
    version: string;
    description: string;
    nodes: NodeAm[];
    edges: EdgeAm[];
}

const ConvertUnits = (units: EnumBase[]): UnitAm[] => {
    let converted = [] as UnitAm[]

    if (!units)
        return converted;

    units.forEach(unit => {
        const u = {
            id: unit.id,
            name: unit.name,
            description: unit.description,
            semanticReference: unit.semanticReference
        } as UnitAm;

        converted.push(u);
    });

    return converted;
}

const ConvertAttributes = (attributes: Attribute[]): AttributeAm[] => {
    let converted = [] as AttributeAm[]

    if (!attributes)
        return converted;

    attributes.forEach(attribute => {
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
            units: ConvertUnits(attribute.units)
        } as AttributeAm;

        converted.push(a);
    });

    return converted;
}

const ConvertConnectors = (connectors: Connector[]): ConnectorAm[] => {
    let converted = [] as ConnectorAm[]

    if (!connectors)
        return converted;

    connectors.forEach(connector => {
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
            attributes: ConvertAttributes(connector.attributes)
        } as ConnectorAm;

        converted.push(a);
    });

    return converted;
}

const ConvertNodes = (nodes: Node[]): NodeAm[] => {
    let convertedNodes = [] as NodeAm[]

    if (!nodes)
        return convertedNodes;

    nodes.forEach(node => {
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
            statusId: node.statusId,
            masterProjectId: node.masterProjectId,
            connectors: ConvertConnectors(node.connectors),
            attributes: ConvertAttributes(node.attributes),
            aspect: node.aspect,
            isRoot: node.isRoot
        } as NodeAm;

        convertedNodes.push(n);
    });

    return convertedNodes;
}

const ConvertEdges = (edges: Edge[]): EdgeAm[] => {
    let convertedEdges = [] as EdgeAm[]

    if (!edges)
        return convertedEdges;

    edges.forEach(edge => {
        const e = {
            id: edge.id,
            fromConnectorId: edge.fromConnectorId,
            fromNodeId: edge.fromNodeId,
            toConnectorId: edge.toConnectorId,
            toNodeId: edge.toNodeId,
            masterProjectId: edge.masterProjectId,
            isTemplateEdge: edge.isTemplateEdge
        } as EdgeAm;

        convertedEdges.push(e);
    });

    return convertedEdges;
}

const ConvertProject = (project: Project): ProjectAm => {
    const proj = {
        name: project.name,
        version: project.version,
        description: project.description,
        nodes: ConvertNodes(project.nodes),
        edges: ConvertEdges(project.edges)
    } as ProjectAm;

    return proj;
}



export default ConvertProject;
