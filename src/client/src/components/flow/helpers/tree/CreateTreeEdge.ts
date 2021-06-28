import red from "../../../../redux/store";
import { FlowElement } from "react-flow-renderer";
import { Edge, Node } from "../../../../models";
import { EdgeType, EDGE_TYPE } from "../../../../models/project";

export const CreateTreeEdge = (edge: Edge, edgeType: EdgeType): FlowElement => {
  let element = null;

  const nodes = red.store.getState().projectState.project.nodes as Node[];
  const fromNode = nodes.find((node) => node?.id === edge.fromNodeId);
  const toNode = nodes.find((node) => node?.id === edge.toNodeId);

  if (edge.fromNode && edge.toNode) {
    element = {
      id: edge.id,
      type: edgeType,
      source: edge.fromNodeId,
      target: edge.toNodeId,
      sourceHandle: edge.fromConnectorId,
      targetHandle: edge.toConnectorId,
      arrowHeadType: null,
      animated: edgeType === EDGE_TYPE.TRANSPORT,
      label: "",
      data: {
        source: fromNode,
        target: toNode,
        edge: edge,
      },
      isHidden: edge.isHidden,
      parentType: fromNode?.aspect,
      targetType: toNode?.aspect,
    };
  }
  return element;
};

export default CreateTreeEdge;
