import {
    Project,
    Node,
    Connector,
    CONNECTOR_TYPE,
    EDGE_TYPE,
    NodeType,
    NODE_TYPE,
    RELATION_TYPE,
    EdgeType
} from "../../models/project";
import {
    Elements,
    FlowElement,
    Position,
    HandleType
} from "react-flow-renderer";
import { CreateElementEdge, CreateElementBlockNode, IsAspectNode } from "./helpers";

export interface GetCenterParams {
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
}


export const getCenter = ({
    sourceX,
    sourceY,
    targetX,
    targetY,
}: GetCenterParams): [number, number, number, number] => {
    const xOffset = Math.abs(targetX - sourceX) / 2;
    const centerX = targetX < sourceX ? targetX + xOffset : targetX - xOffset;

    const yOffset = Math.abs(targetY - sourceY) / 2;
    const centerY = targetY < sourceY ? targetY + yOffset : targetY - yOffset;

    return [centerX, centerY, xOffset, yOffset];
};

export const CreateElementNode = (node: Node): FlowElement => {
    let elementNode = null;
    if (!node) return elementNode;

    let type = !IsAspectNode(node.type)
        ? node.type.charAt(0).toUpperCase() + node.type.substring(1).toLowerCase()
        : node.type;

    let position = {};
    position = { x: node.positionX, y: node.positionY };

    elementNode = {
        id: node.id,
        type: type,
        data: node,
        position: position,
        isHidden: node.isHidden,
        isSelected: node.isSelected,
        draggable: true,
        selectable: true,
        connectable: true
    };

    return elementNode;
};

export const CreateProjectNodes = (project: Project): Elements => {
    const initialElements: Elements = [];

    if (!project) return;

    project.nodes.forEach((node) => {
        const elementNode = CreateElementNode(node);
        if (elementNode) initialElements.push(elementNode);
    });

    project.edges.forEach((edge) => {
        const elementEdge = CreateElementEdge(edge, EDGE_TYPE.DEFAULT as EdgeType);
        if (elementEdge) initialElements.push(elementEdge);
    });

    return initialElements;
};

export const CreateProjectBlockViewNodes = (project: Project, nodeId: string, width: number, height: number): Elements => {
    const initialElements: Elements = [];
    const childrenNodes = [];

    if (!project)
        return;

    const actualNode = project.nodes.find(node => node.id === nodeId);
    const elementNode = CreateElementBlockNode(actualNode, width, height);
    if (elementNode) {
        initialElements.push(elementNode);
    }

    project.edges.forEach((edge) => {
        if (edge.fromNode === nodeId) {

            const fromNode = project.nodes.find((x) => x.id === edge.fromNode);

            const currentConnector = fromNode.connectors.find(x => x.id === edge.fromConnector);

            if (currentConnector && currentConnector.relationType === RELATION_TYPE.PartOf) {


                const toNode = project.nodes.find((x) => x.id === edge.toNode);
                const elementToNode = CreateElementNode(toNode);
                if (elementNode) {
                    initialElements.push(elementToNode);
                    childrenNodes.push(toNode);
                }
            }
        }
    });

    project.edges.forEach((edge) => {

        const fromNode = childrenNodes.find((x) => x.id === edge.fromNode);
        const toNode = childrenNodes.find((x) => x.id === edge.toNode);

        if (fromNode && toNode) {
            const fromConnector = fromNode.connectors.find(x => x.id === edge.fromConnector);
            const toConnector = toNode.connectors.find(x => x.id === edge.toConnector);

            if (fromConnector && fromConnector.relationType === RELATION_TYPE.Transport && toConnector && toConnector.relationType === RELATION_TYPE.Transport) {
                const elementEdge = CreateElementEdge(edge, EDGE_TYPE.BLOCK as EdgeType);
                if (elementEdge)
                    initialElements.push(elementEdge);
            }

        }
    });

    return initialElements;
};

export const processType = (connector: Connector): [HandleType, Position] => {
    if (
        connector.type === CONNECTOR_TYPE.OUTPUT &&
        connector.relationType === RELATION_TYPE.Relation
    )
        return ["source", Position.Right];

    if (
        connector.type === CONNECTOR_TYPE.OUTPUT &&
        connector.relationType === RELATION_TYPE.Transport
    )
        return ["source", Position.Right];

    if (
        connector.type === CONNECTOR_TYPE.INPUT &&
        connector.relationType === RELATION_TYPE.Relation
    )
        return ["target", Position.Left];

    if (
        connector.type === CONNECTOR_TYPE.INPUT &&
        connector.relationType === RELATION_TYPE.Transport
    )
        return ["target", Position.Left];

    if (
        connector.type === CONNECTOR_TYPE.INPUT &&
        connector.relationType === RELATION_TYPE.PartOf
    )
        return ["target", Position.Top];

    if (
        connector.type === CONNECTOR_TYPE.OUTPUT &&
        connector.relationType === RELATION_TYPE.PartOf
    )
        return ["source", Position.Bottom];

    return ["source", Position.Bottom];
};
