export interface IModuleInterface
{
}
export interface TerminalAm extends ConnectorAm
{
	color: string;
	isProxy: boolean;
	proxyParent: string;
	proxySibling: string;
	terminalTypeId: string;
	terminalTypeIri: string;
	terminalParentTypeId: string;
	terminalParentTypeIri: string;
	terminalParentTypeName: string;
	typeReferences: TypeReference[];
	attributes: AttributeAm[];
}
export interface SubProjectAm
{
	fromProjectId: string;
	name: string;
	description: string;
	Blocks: string[];
	edges: string[];
}
export interface RelationAm extends ConnectorAm
{
	relationType: RelationType;
}
export interface ProjectFileAm
{
	parserId: string;
	fileContent: string;
	fileFormat: FileFormat;
	filename: string;
}
export interface ProjectConverterAm
{
	parserId: string;
	project: ProjectAm;
	fileName: string;
}
export interface ProjectAm
{
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
	Blocks: NodeAm[];
	edges: EdgeAm[];
}
export interface PrepareAm
{
	subProjectId: string;
	version: string;
	projectId: string;
	dropPositionX: number;
	dropPositionY: number;
}
export interface NodeAm
{
	id: string;
	iri: string;
	aspect: Aspect;
	nodeType: BlockType;
	domain: string;
	projectId: string;
	projectIri: string;
	name: string;
	version: string;
	label: string;
	rds: string;
	typeReferences: TypeReference[];
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
}
export interface LockAm
{
	id: string;
	projectId: string;
	isLocked: boolean;
	type: EntityType;
}
export interface EdgeAm
{
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
}
export interface CreateProjectAm
{
	name: string;
	description: string;
}
export interface ConnectorAm
{
	id: string;
	iri: string;
	domain: string;
	name: string;
	type: ConnectorDirection;
	connectorVisibility: ConnectorVisibility;
	BlockId: string;
	BlockIri: string;
	isRequired: boolean;
}
export interface CommitPackageAm
{
	projectId: string;
	commitStatus: CommitStatus;
	parser: string;
	receivingDomain: string;
}
export interface CollaborationPartnerAm
{
	name: string;
	domain: string;
	current: boolean;
	iris: string[];
}
export interface AttributeAm
{
	id: string;
	iri: string;
	entity: string;
	value: string;
	attributeTypeId: string;
	attributeTypeIri: string;
	selectedUnitId: string;
	units: Unit[];
	specifiedScope: string;
	specifiedProvenance: string;
	rangeSpecifying: string;
	regularitySpecified: string;
	terminalId: string;
	terminalIri: string;
	BlockId: string;
	BlockIri: string;
	isLocked: boolean;
	isLockedStatusBy: string;
	isLockedStatusDate: Date;
}
export interface VersionCm
{
	id: string;
	ver: string;
	type: string;
	typeId: string;
	name: string;
	created: Date;
	createdBy: string;
}
export interface UserCm
{
	name: string;
	email: string;
	role: string;
}
export interface ProjectVersionCm
{
	projectId: string;
	version: string;
}
export interface ProjectItemCm
{
	id: string;
	iri: string;
	domain: string;
	name: string;
	version: string;
	description: string;
	projectOwner: string;
	updated: Date;
	updatedBy: string;
}
export interface PrepareCm
{
	subProjectId: string;
	Blocks: Block[];
	edges: Edge[];
}
export interface LockCm
{
	id: string;
	projectId: string;
	isLocked: boolean;
	isLockedStatusBy: string;
	isLockedStatusDate: Date;
	type: EntityType;
}
export interface CombinedAttributeFilter
{
	name: string;
	combinedAttributes: CombinedAttribute[];
}
export interface CombinedAttribute
{
	qualifier: string;
	source: string;
	condition: string;
	combined: string;
}
export interface ReplacementId
{
	fromId: string;
	fromIri: string;
	toId: string;
	toIri: string;
}
export interface Module
{
	moduleDescription: ModuleDescription;
	instance: IModuleInterface;
	moduleType: ModuleType;
}
export interface LockDm
{
	id: string;
	projectId: string;
	isLocked: boolean;
	isLockedStatusBy: string;
	isLockedStatusDate: Date;
	type: EntityType;
}
export interface LibrarySubProjectVersion
{
	id: string;
	name: string;
	version: string;
}
export interface LibrarySubProject
{
	id: string;
	name: string;
	version: string;
	description: string;
	versions: LibrarySubProjectVersion[];
}
export interface ImfData
{
	id: string;
	projectId: string;
	version: string;
	environment: string;
	parser: string;
	senderDomain: string;
	receivingDomain: string;
	document: string;
	commitStatus: CommitStatus;
}
export interface FileFormat
{
	contentType: string;
	fileExtension: string;
}
export interface VersionData
{
	id: string;
	name: string;
	version: string;
	description: string;
	ver: string;
	data: string;
	type: string;
}
export interface Version
{
	id: number;
	ver: string;
	type: string;
	typeId: string;
	name: string;
	created: Date;
	createdBy: string;
	data: string;
}
export interface Unit
{
	id: string;
	iri: string;
	unitTypeId: string;
	unitTypeIri: string;
	name: string;
	symbol: string;
	kind: string;
}
export interface TypeReferenceSub
{
	id: string;
	name: string;
	iri: string;
	isDefault: boolean;
}
export interface TypeReference
{
	name: string;
	iri: string;
	source: string;
	subs: TypeReferenceSub[];
	kind: string;
}
export interface Terminal extends Connector
{
	kind: string;
	color: string;
	terminalTypeId: string;
	terminalTypeIri: string;
	terminalParentTypeId: string;
	terminalParentTypeIri: string;
	terminalParentTypeName: string;
	attributes: Attribute[];
	discriminator: string;
	isProxy: boolean;
	proxyParent: string;
	proxySibling: string;
	typeReferences: TypeReference[];
}
export interface Relation extends Connector
{
	kind: string;
	relationType: RelationType;
	discriminator: string;
}
export interface ProjectEdge
{
	projectId: string;
	edgeId: string;
}
export interface Project
{
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
	Blocks: Block[];
	edges: Edge[];
}
export interface ObjectIdentity
{
	id: string;
	type: EntityType;
}
export interface Block
{
	id: string;
	iri: string;
	domain: string;
	kind: string;
	rds: string;
	description: string;
	typeReferences: TypeReference[];
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
	updatedBy: string;
	updated: Date;
	created: Date;
	createdBy: string;
	libraryTypeId: string;
	version: string;
	aspect: Aspect;
	nodeType: BlockType;
	masterProjectId: string;
	masterProjectIri: string;
	symbol: string;
	purposeString: string;
	connectors: Connector[];
	attributes: Attribute[];
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
export interface ModuleDescription
{
	id: string;
	name: string;
}
export interface Edge
{
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
	fromBlock: Block;
	toNodeId: string;
	toNodeIri: string;
	toBlock: Block;
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
export interface Connector
{
	id: string;
	iri: string;
	domain: string;
	kind: string;
	name: string;
	type: ConnectorDirection;
	connectorVisibility: ConnectorVisibility;
	BlockId: string;
	BlockIri: string;
	isRequired: boolean;
}
export interface Attribute
{
	id: string;
	iri: string;
	kind: string;
	entity: string;
	value: string;
	attributeTypeId: string;
	attributeTypeIri: string;
	selectedUnitId: string;
	units: Unit[];
	specifiedScope: string;
	specifiedProvenance: string;
	rangeSpecifying: string;
	regularitySpecified: string;
	terminalId: string;
	terminalIri: string;
	BlockId: string;
	BlockIri: string;
	isLocked: boolean;
	isLockedStatusBy: string;
	isLockedStatusDate: Date;
}
export enum RelationType
{
	NotSet = 0,
	HasLocation = 1,
	PartOf = 2,
	FulfilledBy = 3,
}
export enum BlockType
{
	Root = 0,
	Aspect = 1,
	Handler = 2,
}
export enum EntityType
{
	Block = 0,
	Edge = 1,
	Attribute = 2,
}
export enum ConnectorVisibility
{
	None = 0,
	InputVisible = 1,
	OutputVisible = 2,
}
export enum CommitStatus
{
	NotSet = 0,
	Working = 1,
	Review = 2,
	Approved = 4,
	Committed = 8,
	Sent = 16,
}
export enum ModuleType
{
	Plugin = 0,
	Parser = 1,
	SyncService = 2,
}
export enum Aspect
{
	NotSet = 0,
	None = 1,
	Function = 2,
	Product = 4,
	Location = 8,
}
export enum ConnectorDirection
{
	Input = 0,
	Output = 1,
	Bidirectional = 2,
}
