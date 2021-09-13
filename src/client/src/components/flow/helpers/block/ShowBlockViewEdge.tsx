import red from "../../../../redux/store";
import { Edge, Node } from "../../../../models";
import { GetSelectedNode } from "../common";
import { ValidateBlockEdge } from "../../validators";

const ShowBlockViewEdge = (edge: Edge) => {
  const splitView = red.store.getState().splitView;
  const isSplitView = splitView.visible;
  const splitViewNode = splitView.node as Node;
  const selectedNode = GetSelectedNode();

  return ValidateBlockEdge(
    selectedNode,
    edge.fromNode,
    edge.toNode,
    splitViewNode,
    edge.fromConnector,
    edge.toConnector,
    isSplitView
  );
};

export default ShowBlockViewEdge;
