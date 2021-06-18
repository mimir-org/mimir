import { FlowElement } from "react-flow-renderer";
import { ShowBlockViewEdge } from ".";
import { Edge } from "../../../../models";
import { EdgeType } from "../../../../models/project";

export const CreateBlockEdge = (
  edge: Edge,
  edgeType: EdgeType
): FlowElement => {
  let element = null;

  if (ShowBlockViewEdge(edge) && (edge.fromNode || edge.toNode)) {
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
        source: edge.fromNode,
        target: edge.toNode,
        edge: edge,
      },
      isHidden: edge.isHidden,
    };
  }
  return element;
};

export default CreateBlockEdge;
