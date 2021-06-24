import { FlowElement } from "react-flow-renderer";
import { ShowBlockViewEdge } from ".";
import { Edge, Node } from "../../../../models";
import { EdgeType } from "../../../../models/project";

export const CreateBlockEdge = (
  nodes: Node[],
  edge: Edge,
  edgeType: EdgeType
): FlowElement => {
  let element = null;

  const fromNode = nodes.find((node) => node.id === edge.fromNodeId);
  const toNode = nodes.find((node) => node.id === edge.toNodeId);

  if (ShowBlockViewEdge(edge) && (edge.fromNode || edge.toNode)) {
    element = {
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
    };
  }
  return element;
};

export default CreateBlockEdge;
