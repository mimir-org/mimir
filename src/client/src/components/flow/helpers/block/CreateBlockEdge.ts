import { FlowElement } from "react-flow-renderer";
import { ShowBlockViewEdge } from ".";
import { Edge, EdgeType } from "../../../../models/project";
import red from "../../../../redux/store";

export const CreateBlockEdge = (
    edge: Edge,
    edgeType: EdgeType
): FlowElement => {
    const project = red.store.getState().projectState.project;
    const nodes = project?.nodes;

    const fromNode = nodes.find((x) => x.id === edge.fromNode);
    const toNode = nodes.find((x) => x.id === edge.toNode);
    let element = null;

    if (ShowBlockViewEdge(edge) && (fromNode || toNode)) {
        element = {
            id: edge.id,
            type: edgeType,
            source: edge.fromNode,
            target: edge.toNode,
            sourceHandle: edge.fromConnector,
            targetHandle: edge.toConnector,
            arrowHeadType: null,
            label: "",
            data: {
                source: fromNode,
                target: toNode,
                edge: edge,
            },
            isHidden: edge.isHidden,
            parentType: fromNode?.type,
            targetType: toNode?.type,
        };
    }
    return element;
};

export default CreateBlockEdge;
