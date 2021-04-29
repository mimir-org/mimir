import { Edge, Node } from "../../../models/project";

export interface OffPageNodeCreator {
    node: Node;
    partOfEdge: Edge;
    transportEdge: Edge;
};

export interface CreateOffPageData {
    parentNodeId: string;
    fromNodeId: string;
    fromConnectorId: string;
    x: number;
    y: number;
};

export interface GetCenterParams {
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
}
