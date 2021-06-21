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
      source: edge.fromNodeId,
      target: edge.toNodeId,
      sourceHandle: edge.fromConnectorId,
      targetHandle: edge.toConnectorId,
      animated: true,
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
