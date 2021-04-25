import {
    Project,
    Node,
    Connector,
    CONNECTOR_TYPE,
    Edge,
    EDGE_TYPE,
    NodeType,
    NODE_TYPE,
    RELATION_TYPE,
} from "../../models/project";
import {
    Elements,
    FlowElement,
    Position,
    HandleType,
    ArrowHeadType,
} from "react-flow-renderer";
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

export const createId = () => {
    function _p8(s: boolean) {
        var p = (Math.random().toString(16) + "000000000").substr(2, 8);
        return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }
    return _p8(false) + _p8(true) + _p8(true) + _p8(false);
};

export const CreateElementNode = (node: Node, isBlockView: boolean): FlowElement => {
    let elementNode = null;
    if (!node) return elementNode;

    let type = !isAspectNode(node.type)
        ? node.type.charAt(0).toUpperCase() + node.type.substring(1).toLowerCase()
        : node.type;

    let position = {};

    if (isBlockView) {
        type += '_block';
        var elem = document.getElementsByClassName("react-flow")[0].getBoundingClientRect();
        console.log(elem.width);


        position = { x: elem.width / 2 - 300, y: 0 };

    } else {
        position = { x: node.positionX, y: node.positionY };
    }



    elementNode = {
        id: node.id,
        type: type,
        data: node,
        position: position,
        isHidden: node.isHidden,
        isSelected: node.isSelected,
    };


    //   document.querySelectorAll('[data-foo="value"]');


    return elementNode;
};

export const CreateElementEdge = (
    edge: Edge,
    fromNode: Node,
    toNode: Node
): FlowElement => {
    let elem = {
        id: edge.id,
        type: EDGE_TYPE.DEFAULT,
        source: edge.fromNode,
        target: edge.toNode,
        sourceHandle: edge.fromConnector,
        targetHandle: edge.toConnector,
        arrowHeadType: ArrowHeadType.ArrowClosed,
        label: "",
        data: {
            source: fromNode,
            target: toNode,
        },
        isHidden: edge.isHidden,
        parentType: fromNode.type,
    };
    return elem;
};

export const isAspectNode = (nodeType: NodeType): boolean => {
    return (
        nodeType === (NODE_TYPE.ASPECT_FUNCTION as NodeType) ||
        nodeType === (NODE_TYPE.ASPECT_PRODUCT as NodeType) ||
        nodeType === (NODE_TYPE.ASPECT_LOCATION as NodeType)
    );
};

export const CreateProjectNodes = (project: Project): Elements => {
    const initialElements: Elements = [];

    if (!project) return;

    project.nodes.forEach((node) => {
        const elementNode = CreateElementNode(node, false);
        if (elementNode) initialElements.push(elementNode);
    });

    project.edges.forEach((edge) => {
        const fromNode = project.nodes.find((x) => x.id === edge.fromNode);
        const toNode = project.nodes.find((x) => x.id === edge.toNode);
        const elementEdge = CreateElementEdge(edge, fromNode, toNode);
        if (elementEdge) initialElements.push(elementEdge);
    });

    return initialElements;
};

export const CreateProjectBlockViewNodes = (project: Project): Elements => {
    const initialElements: Elements = [];

    if (!project) return;

    const actualNode = project.nodes.find(node => node.id === '09f6c8ff-bd9e-39c2-16b4-af45d33bfcf0');
    const elementNode = CreateElementNode(actualNode, true);
    if (elementNode) initialElements.push(elementNode);

    const fromNodes = [];
    const toNodes = [];

    // project.nodes.forEach((node) => {
    //     const elementNode = CreateElementNode(node);
    //     if (elementNode) initialElements.push(elementNode);
    // });

    project.edges.forEach((edge) => {
        const fromNode = project.nodes.find((x) => x.id === edge.fromNode);
        const toNode = project.nodes.find((x) => x.id === edge.toNode);
        if (fromNode.id === actualNode.id)
            fromNodes.push(edge);

        if (toNode.id === actualNode.id)
            toNodes.push(edge);

        // const elementEdge = CreateElementEdge(edge, fromNode, toNode);
        // if (elementEdge) initialElements.push(elementEdge);
    });

    return initialElements;
}

export const processType = (connector: Connector): [HandleType, Position] => {
    if (connector.type === CONNECTOR_TYPE.OUTPUT && connector.relationType === RELATION_TYPE.Relation)
        return ["source", Position.Right];

    if (connector.type === CONNECTOR_TYPE.OUTPUT && connector.relationType === RELATION_TYPE.Transport)
        return ["source", Position.Right];

    if (connector.type === CONNECTOR_TYPE.INPUT && connector.relationType === RELATION_TYPE.Relation)
        return ["target", Position.Left];

    if (connector.type === CONNECTOR_TYPE.INPUT && connector.relationType === RELATION_TYPE.Transport)
        return ["target", Position.Left];

    if (connector.type === CONNECTOR_TYPE.INPUT && connector.relationType === RELATION_TYPE.PartOf)
        return ["target", Position.Top];

    if (connector.type === CONNECTOR_TYPE.OUTPUT && connector.relationType === RELATION_TYPE.PartOf)
        return ["source", Position.Bottom];

    return ["source", Position.Bottom];
};
