import { FlowElement } from "react-flow-renderer";
import { Edge } from "../../../../models";
import { EdgeType, EDGE_TYPE } from "../../../../models/project";

export const CreateTreeEdge = (edge: Edge, edgeType: EdgeType): FlowElement => {
  let element = null;

  if (edge.fromNode && edge.toNode) {
    element = {
      id: edge.id,
      type: edgeType,
      source: edge.fromNode,
      target: edge.toNode,
      sourceHandle: edge.fromConnector,
      targetHandle: edge.toConnector,
      arrowHeadType: null,
      animated: edgeType === EDGE_TYPE.TRANSPORT,
      label: "",
      data: {
        source: edge.fromNode,
        target: edge.toNode,
        edge: edge,
      },
      isHidden: edge.isHidden,
      parentType: edge.fromNode.aspect,
      targetType: edge.toNode.aspect,
    };
  }
  return element;
};

export default CreateTreeEdge;
