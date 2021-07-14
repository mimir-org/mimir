import red from "../../../../redux/store";
import { ValidateBlockEdge } from ".";
import { Edge, Node } from "../../../../models";
import { FindSelectedNode } from "../common";

const ShowBlockViewEdge = (edge: Edge) => {
  const splitView = red.store.getState().splitView;
  const isSplitView = splitView.visible;
  const splitViewNode = splitView.node as Node;
  const selectedNode = FindSelectedNode();

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
