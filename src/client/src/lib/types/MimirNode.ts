import {Aspect, Attribute, Connector, Edge, Node, NodeType, TypeReference} from "@mimirorg/modelbuilder-types";
import {IsPartOfRelation} from "../../components/flow/helpers/Connectors";
import {MimirEdge} from "./MimirEdge";
import * as Icons from "../../assets/icons/aspects"

export class MimirNode implements Node {
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
    nodeType: NodeType;
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
    hidden: boolean;
    blockHidden: boolean;
    selected: boolean;
    blockSelected: boolean;

    constructor(node: Node) {
        this.id = node.id;
        this.iri = node.iri;
        this.domain = node.domain;
        this.kind = node.kind;
        this.rds = node.rds;
        this.description = node.description ? node.description : "";
        this.typeReferences = node.typeReferences;
        this.name = node.name;
        this.label = node.label;
        this.positionX = node.positionX;
        this.positionY = node.positionY;
        this.isLocked = node.isLocked;
        this.isLockedStatusBy = node.isLockedStatusBy;
        this.isLockedStatusDate = node.isLockedStatusDate;
        this.positionBlockX = node.positionBlockX;
        this.positionBlockY = node.positionBlockY;
        this.level = node.level;
        this.order = node.order;
        this.updatedBy = node.updatedBy;
        this.updated = node.updated;
        this.created = node.created;
        this.createdBy = node.createdBy;
        this.libraryTypeId = node.libraryTypeId;
        this.version = node.version;
        this.aspect = node.aspect;
        this.nodeType = node.nodeType;
        this.masterProjectId = node.masterProjectId;
        this.masterProjectIri = node.masterProjectIri;
        this.symbol = node.symbol;
        this.purposeString = node.purposeString;
        this.connectors = node.connectors;
        this.attributes = node.attributes;
        this.projectId = node.projectId;
        this.projectIri = node.projectIri;
        this.width = node.width;
        this.height = node.height;
        this.hidden = node.hidden;
        this.blockHidden = node.blockHidden;
        this.selected = node.selected;
        this.blockSelected = node.blockSelected;
    }

    // TODO: Move is part of relation to a more generic place
    public findChildrenEdge(edges: Edge[]): Edge {
        return edges.find((edge) => edge.fromNodeId === this.id && IsPartOfRelation(edge.fromConnector));
    }

    public hasChildren(edges: Edge[]): boolean {
        return !!this.findChildrenEdge(edges);
    }

    // TODO: Refactor this code into MimirProject completely, this function is currently used in SetSiblingRDS.ts
    public findParentEdge(nodeId: string, edges: MimirEdge[]): MimirEdge {
        return edges.find((edge) => edge.toNodeId === nodeId && IsPartOfRelation(edge.fromConnector));
    }

    public isAspectNode = (node?: MimirNode) => {
        if (node) {
            return node.nodeType === NodeType.Root;
        }
        return this.nodeType === NodeType.Root;
    };

    public isAncestorInSet(currentNode: MimirNode, set: Set<string>, edges: MimirEdge[]): boolean {
        const edge = this.findParentEdge(currentNode.id, edges);
        if (!edge) return false;

        const parentNode = edge.fromNode as MimirNode;
        if (set.has(parentNode.id)) return true;

        return this.isAncestorInSet(parentNode, set, edges);
    }

    public isLocation = () => {
        return this.aspect === Aspect.Location;
    };

    isProduct = () => {
        return this.aspect === Aspect.Product;
    };

    public isFunction = () => {
        return this.aspect === Aspect.Function;
    };

    public getAspectIcon = (): string => {
        if (!this.isAspectNode()) console.error("Node is not an aspectNode, this.aspect:", this.aspect)
        if (this.aspect === Aspect.Function) return Icons.Function;
        if (this.aspect === Aspect.Product) return Icons.Product;
        if (this.aspect === Aspect.Location) return Icons.Location;
    }

    public convertToNode(): Node {
        return {
            id: this.id,
            iri: this.iri,
            domain: this.domain,
            kind: this.kind,
            rds: this.rds,
            description: this.description,
            typeReferences: this.typeReferences,
            name: this.name,
            label: this.label,
            positionX: this.positionX,
            positionY: this.positionY,
            isLocked: this.isLocked,
            isLockedStatusBy: this.isLockedStatusBy,
            isLockedStatusDate: this.isLockedStatusDate,
            positionBlockX: this.positionBlockX,
            positionBlockY: this.positionBlockY,
            level: this.level,
            order: this.order,
            updatedBy: this.updatedBy,
            updated: this.updated,
            created: this.created,
            createdBy: this.createdBy,
            libraryTypeId: this.libraryTypeId,
            version: this.version,
            aspect: this.aspect,
            nodeType: this.nodeType,
            masterProjectId: this.masterProjectId,
            masterProjectIri: this.masterProjectIri,
            symbol: this.symbol,
            purposeString: this.purposeString,
            connectors: this.connectors,
            attributes: this.attributes,
            projectId: this.projectId,
            projectIri: this.projectIri,
            width: this.width,
            height: this.height,
            hidden: this.hidden,
            blockHidden: this.blockHidden,
            selected: this.selected,
            blockSelected: this.blockSelected,
        };
    }
}
