import { Edge, EdgeType } from "../../../models/project";
import { FlowElement, ArrowHeadType } from "react-flow-renderer";
import store from "../../../redux/store";

export const CreateElementEdge = (
    edge: Edge,
    edgeType: EdgeType
): FlowElement => {
    const nodes = store.getState().projectState.project.nodes;

    const fromNode = nodes.find((x) => x.id === edge.fromNode);
    const toNode = nodes.find((x) => x.id === edge.toNode);
    if (fromNode && toNode) {
        let elem = {
            id: edge.id,
            type: edgeType,
            source: edge.fromNode,
            target: edge.toNode,
            sourceHandle: edge.fromConnector,
            targetHandle: edge.toConnector,
            arrowHeadType: ArrowHeadType.ArrowClosed,
            label: "",
            data: {
                source: fromNode,
                target: toNode,
                edge: edge,
            },
            isHidden: edge.isHidden,
            parentType: fromNode.type,
            targetType: toNode.type,
        };
        return elem;
    }
};

export default CreateElementEdge;
