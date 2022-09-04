export interface TransportAm {
    id: string;
    iri: string;
    domain: string;
    version: string;
    rds: string;
    name: string;
    label: string;
    description: string;
    statusId: string;
    semanticReference: string;
    inputTerminalId: string;
    inputTerminal: TerminalAm;
    outputTerminalId: string;
    outputTerminal: TerminalAm;
    attributes: AttributeAm[];
    updatedBy: string;
    updated: Date;
    created: Date;
    createdBy: string;
    libraryTypeId: string;
}
export interface TerminalAm extends ConnectorAm {
}
export interface SubProjectAm {
    fromProjectId: string;
    name: string;
    description: string;
    nodes: string[];
    edges: string[];
}
export interface SimpleAm {
    id: string;
    iri: string;
    name: string;
    attributes: AttributeAm[];
    nodeId: string;
    nodeIri: string;
}
export interface RelationAm extends ConnectorAm {
}
export interface ProjectFileAm {
    parserId: string;
    fileContent: string;
    fileFormat: FileFormat;
}
export interface ProjectConverterAm {
    parserId: string;
    project: ProjectAm;
}
export interface ProjectAm {
    id: string;
    iri: string;
    domain: string;
    name: string;
    isSubProject: boolean;
    version: string;
    description: string;
    projectOwner: string;
    updatedBy: string;
    updated: Date;
    nodes: NodeAm[];
    edges: EdgeAm[];
}
export interface NodeAm {
    id: string;
    iri: string;
    aspect: Aspect;
    isRoot: boolean;
    domain: string;
    projectId: string;
    projectIri: string;
    name: string;
    version: string;
    label: string;
    rds: string;
    semanticReference: string;
    description: string;
    positionX: number;
    positionY: number;
    positionBlockX: number;
    positionBlockY: number;
    width: number;
    height: number;
    isLocked: boolean;
    isLockedStatusBy: string;
    isLockedStatusDate: Date;
    statusId: string;
    masterProjectId: string;
    masterProjectIri: string;
    symbol: string;
    purpose: string;
    created: Date;
    createdBy: string;
    updated: Date;
    updatedBy: string;
    libraryTypeId: string;
    connectors: ConnectorAm[];
    attributes: AttributeAm[];
    simples: SimpleAm[];
}
export interface LockAm {
    id: string;
    projectId: string;
    isLocked: boolean;
    type: EntityType;
}
export interface InterfaceAm {
    id: string;
    iri: string;
    domain: string;
    version: string;
    rds: string;
    name: string;
    label: string;
    description: string;
    statusId: string;
    semanticReference: string;
    inputTerminalId: string;
    inputTerminal: TerminalAm;
    outputTerminalId: string;
    outputTerminal: TerminalAm;
    attributes: AttributeAm[];
    updatedBy: string;
    updated: Date;
    created: Date;
    createdBy: string;
    libraryTypeId: string;
}
export interface EdgeAm {
    id: string;
    iri: string;
    domain: string;
    projectId: string;
    projectIri: string;
    fromConnectorId: string;
    fromConnectorIri: string;
    toConnectorId: string;
    toConnectorIri: string;
    fromNodeId: string;
    fromNodeIri: string;
    toNodeId: string;
    toNodeIri: string;
    masterProjectId: string;
    masterProjectIri: string;
    isLocked: boolean;
    isLockedStatusBy: string;
    isLockedStatusDate: Date;
    transport: TransportAm;
    interface: InterfaceAm;
}
export interface CreateProjectAm {
    name: string;
    description: string;
}
export interface ConnectorAm {
    id: string;
    iri: string;
    domain: string;
    name: string;
    type: ConnectorDirection;
    semanticReference: string;
    connectorVisibility: ConnectorVisibility;
    nodeId: string;
    nodeIri: string;
    isRequired: boolean;
    relationType: RelationType;
    color: string;
    terminalCategory: string;
    terminalTypeId: string;
    terminalTypeIri: string;
    attributes: AttributeAm[];
}
export interface CommitPackageAm {
    projectId: string;
    commitStatus: CommitStatus;
    parser: string;
    receivingDomain: string;
}
export interface CollaborationPartnerAm {
    name: string;
    domain: string;
    current: boolean;
    iris: string[];
}
export interface AttributeAm {
    id: string;
    iri: string;
    domain: string;
    entity: string;
    value: string;
    attributeTypeId: string;
    attributeTypeIri: string;
    selectedUnitId: string;
    units: UnitLibCm[];
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
    selectValues: string[];
    selectType: Select;
    discipline: Discipline;
    isLocked: boolean;
    isLockedStatusBy: string;
    isLockedStatusDate: Date;
}
export interface FileFormat {
    contentType: string;
    fileExtension: string;
}
export interface Version {
    id: number;
    ver: string;
    type: string;
    typeId: string;
    name: string;
    created: Date;
    createdBy: string;
    data: string;
}
export interface Transport {
    id: string;
    iri: string;
    version: string;
    rds: string;
    kind: string;
    name: string;
    label: string;
    description: string;
    statusId: string;
    semanticReference: string;
    attributes: Attribute[];
    inputTerminalId: string;
    inputTerminal: Terminal;
    outputTerminalId: string;
    outputTerminal: Terminal;
    updatedBy: string;
    updated: Date;
    created: Date;
    createdBy: string;
    libraryTypeId: string;
}
export interface Terminal extends Connector {
    color: string;
    terminalCategory: string;
    terminalTypeId: string;
    terminalTypeIri: string;
    attributes: Attribute[];
    discriminator: string;
}
export interface Simple {
    id: string;
    iri: string;
    name: string;
    kind: string;
    attributes: Attribute[];
    nodeId: string;
    nodeIri: string;
}
export interface Relation extends Connector {
    relationType: RelationType;
    discriminator: string;
}
export interface ProjectEdge {
    projectId: string;
    edgeId: string;
}
export interface Project {
    id: string;
    iri: string;
    domain: string;
    isSubProject: boolean;
    version: string;
    name: string;
    description: string;
    projectOwner: string;
    updatedBy: string;
    updated: Date;
    nodes: Node[];
    edges: Edge[];
}
export interface ObjectIdentity {
    id: string;
    type: EntityType;
}
export interface Node {
    id: string;
    iri: string;
    domain: string;
    kind: string;
    rds: string;
    description: string;
    semanticReference: string;
    name: string;
    label: string;
    positionX: number;
    positionY: number;
    isLocked: boolean;
    isLockedStatusBy: string;
    isLockedStatusDate: Date;
    positionBlockX: number;
    positionBlockY: number;
    level: number;
    order: number;
    statusId: string;
    updatedBy: string;
    updated: Date;
    created: Date;
    createdBy: string;
    libraryTypeId: string;
    version: string;
    aspect: Aspect;
    isRoot: boolean;
    masterProjectId: string;
    masterProjectIri: string;
    symbol: string;
    purposeString: string;
    connectors: Connector[];
    attributes: Attribute[];
    simples: Simple[];
    projectId: string;
    projectIri: string;
    width: number;
    height: number;
    parentNodeId: string;
    selected: boolean;
    blockSelected: boolean;
    hidden: boolean;
    blockHidden: boolean;
    isOffPageTarget: boolean;
    isOffPageRequired: boolean;
}
export interface ModuleDescription {
    id: string;
    name: string;
}
export interface Interface {
    id: string;
    iri: string;
    version: string;
    rds: string;
    kind: string;
    name: string;
    label: string;
    description: string;
    statusId: string;
    semanticReference: string;
    attributes: Attribute[];
    inputTerminalId: string;
    inputTerminal: Terminal;
    outputTerminalId: string;
    outputTerminal: Terminal;
    updatedBy: string;
    updated: Date;
    created: Date;
    createdBy: string;
    libraryTypeId: string;
}
export interface Edge {
    id: string;
    iri: string;
    domain: string;
    kind: string;
    fromConnectorId: string;
    fromConnectorIri: string;
    fromConnector: Connector;
    toConnectorId: string;
    toConnectorIri: string;
    toConnector: Connector;
    fromNodeId: string;
    fromNodeIri: string;
    fromNode: Node;
    toNodeId: string;
    toNodeIri: string;
    toNode: Node;
    transportId: string;
    transport: Transport;
    interfaceId: string;
    interface: Interface;
    isLocked: boolean;
    isLockedStatusBy: string;
    isLockedStatusDate: Date;
    masterProjectId: string;
    masterProjectIri: string;
    projectId: string;
    projectIri: string;
    selected: boolean;
    hidden: boolean;
    blockHidden: boolean;
}
export interface Connector {
    id: string;
    iri: string;
    domain: string;
    kind: string;
    name: string;
    type: ConnectorDirection;
    connectorVisibility: ConnectorVisibility;
    nodeId: string;
    nodeIri: string;
    isRequired: boolean;
}
export interface CollaborationPartner {
    id: number;
    name: string;
    domain: string;
    current: boolean;
    iris: string[];
}
export interface Attribute {
    id: string;
    iri: string;
    domain: string;
    kind: string;
    entity: string;
    value: string;
    attributeTypeId: string;
    attributeTypeIri: string;
    selectedUnitId: string;
    units: UnitLibCm[];
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
    selectValues: string[];
    selectType: Select;
    discipline: Discipline;
    isLocked: boolean;
    isLockedStatusBy: string;
    isLockedStatusDate: Date;
}
export enum EntityType {
    Node = 0,
    Edge = 1,
    Attribute = 2,
}
export enum RelationType {
    NotSet = 0,
    HasLocation = 1,
    PartOf = 2,
    FulfilledBy = 3,
}
export enum ConnectorVisibility {
    None = 0,
    InputVisible = 1,
    OutputVisible = 2,
}
export enum CommitStatus {
    NotSet = 0,
    Working = 1,
    Review = 2,
    Approved = 4,
    Committed = 8,
    Sent = 16,
}
export enum Aspect {
    NotSet = 0,
    None = 1,
    Function = 2,
    Product = 4,
    Location = 8,
}
export enum ConnectorDirection {
    Input = 0,
    Output = 1,
    Bidirectional = 2,
}
export enum Discipline {
    None = 0,
    NotSet = 1,
    ProjectManagement = 2,
    Electrical = 4,
    Automation = 8,
    Structural = 16,
    Operation = 32,
    Process = 64,
}
export enum Select {
    None = 0,
    SingleSelect = 1,
    MultiSelect = 2,
}
export interface UnitLibCm {
    id: string;
    name: string;
    iri: string;
    contentReferences: string[];
    description: string;
    created: Date;
    createdBy: string;
    kind: string;
}
