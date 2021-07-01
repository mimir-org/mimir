import { FlowElement } from "react-flow-renderer";
import { ShowBlockViewEdge } from ".";
import { Edge, Node } from "../../../../models";
import { EdgeType } from "../../../../models/project";

export const CreateBlockEdge = (
  nodes: Node[],
  edge: Edge,
  edgeType: EdgeType
) => {
  const fromNode = nodes.find((node) => node.id === edge.fromNodeId);
  const toNode = nodes.find((node) => node.id === edge.toNodeId);

  if (ShowBlockViewEdge(edge)) {
    return {
      id: edge.id,
      type: edgeType,
      source: edge.fromNodeId,
      target: edge.toNodeId,
      sourceHandle: edge.fromConnectorId,
      targetHandle: edge.toConnectorId,
      animated: true, // TODO: fix
      label: "",
      data: {
        source: fromNode,
        target: toNode,
        edge: edge,
      },
      isHidden: edge.isHidden,
    } as FlowElement;
  }
};

export default CreateBlockEdge;
