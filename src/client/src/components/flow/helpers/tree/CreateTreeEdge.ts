import { Edge, EdgeType, EDGE_TYPE } from "../../../../models/project";
import { FlowElement } from "react-flow-renderer";
import store from "../../../../redux/store";

export const CreateTreeEdge = (edge: Edge, edgeType: EdgeType): FlowElement => {
  const nodes = store.getState().projectState.project.nodes;
  const fromNode = nodes.find((x) => x.id === edge.fromNode);
  const toNode = nodes.find((x) => x.id === edge.toNode);
  let element = null;

  if (fromNode && toNode) {
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
        source: fromNode,
        target: toNode,
        edge: edge,
      },
      isHidden: edge.isHidden,
      parentType: fromNode.type,
      targetType: toNode.type,
    };
  }
  return element;
};

export default CreateTreeEdge;
