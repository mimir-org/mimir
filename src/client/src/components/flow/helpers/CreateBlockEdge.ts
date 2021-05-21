import { Edge, EdgeType, NODE_TYPE } from "../../../models/project";
import { FlowElement, ArrowHeadType } from "react-flow-renderer";
import store from "../../../redux/store";

export const CreateBlockEdge = (
  edge: Edge,
  edgeType: EdgeType
): FlowElement => {
  const nodes = store.getState().projectState.project.nodes;
  const sortedNodes = nodes?.filter(
    (x) =>
      x.type !== NODE_TYPE.PRODUCT &&
      x.type !== NODE_TYPE.ASPECT_PRODUCT &&
      x.type !== NODE_TYPE.ASPECT_LOCATION &&
      x.type !== NODE_TYPE.ASPECT_FUNCTION
  );

  const fromNode = sortedNodes.find((x) => x.id === edge.fromNode);
  const toNode = sortedNodes.find((x) => x.id === edge.toNode);

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
    parentType: fromNode?.type,
    targetType: toNode?.type,
  };
  return elem;
};

export default CreateBlockEdge;
