import { Node, Edge, EdgeEvent, NODE_TYPE, NodeType, ICON_TYPE, IconType, CONNECTOR_TYPE, ConnectorType, TERMINAL_CATEGORY, TerminalCategory, TERMINAL_TYPE, TerminalType, RELATION_TYPE, RelationType } from '../../../models/project';
import { createId } from '../utils';
import { ProjectState } from "../../../redux/store/project/types";

export interface OffPageNodeCreator {
    node: Node,
    partOfEdge: Edge,
    transportEdge: Edge
};

const CreateOffPageNode = (data: EdgeEvent, xPos: number, yPos: number, projectState: ProjectState, parentNodeId: string): OffPageNodeCreator => {

    const returnValue = {
        node: null,
        partOfEdge: null,
        transportEdge: null
    } as OffPageNodeCreator;

    if (data.nodeId && data.sourceId) {

        const node = {
            id: createId(),
            name: "Test",
            label: "Test",
            type: NODE_TYPE.OFF_PAGE as NodeType,
            positionX: xPos,
            positionY: yPos,
            connectors: [],
            attributes: [],
            icon: ICON_TYPE.FUNCTION_ICON as IconType,
        } as Node;

        const targetConnector = {
            id: createId(),
            name: "TargetConnector",
            type: CONNECTOR_TYPE.INPUT as ConnectorType,
            terminalCategory: TERMINAL_CATEGORY.Energy as TerminalCategory,
            terminalType: TERMINAL_TYPE.Oil as TerminalType,
            relationType: RELATION_TYPE.Transport as RelationType,
            nodeId: node.id,
        };

        const partOfConnector = {
            id: createId(),
            name: "PartOfConnector",
            type: CONNECTOR_TYPE.INPUT as ConnectorType,
            terminalCategory: TERMINAL_CATEGORY.NotSet as TerminalCategory,
            terminalType: TERMINAL_TYPE.NotSet as TerminalType,
            relationType: RELATION_TYPE.PartOf as RelationType,
            nodeId: node.id,
        };

        node.connectors.push(targetConnector);
        node.connectors.push(partOfConnector);

        returnValue.node = node;

        var currentNode = projectState.project.nodes.find((x) => x.id === parentNodeId);
        var fromConnector = currentNode.connectors.find(
            (x) =>
                x.relationType === RELATION_TYPE.PartOf &&
                x.type === CONNECTOR_TYPE.OUTPUT
        );

        const partofEdge = {
            id: createId(),
            fromConnector: fromConnector.id,
            toConnector: partOfConnector.id,
            fromNode: currentNode.id,
            toNode: node.id,
            isHidden: false,
            parentType: currentNode.type,
            targetType: node.type,
        } as Edge;

        returnValue.partOfEdge = partofEdge;

        const fromNode = projectState.project.nodes.find(
            (x) => x.id === data.nodeId
        );

        const transportEdge = {
            id: createId(),
            fromConnector: data.sourceId,
            toConnector: targetConnector.id,
            fromNode: data.nodeId,
            toNode: node.id,
            isHidden: false,
            parentType: fromNode.type,
            targetType: node.type,
        } as Edge;

        returnValue.transportEdge = transportEdge;
    }
    return returnValue;
}

export default CreateOffPageNode;
