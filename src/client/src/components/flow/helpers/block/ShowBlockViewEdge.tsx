import red from "../../../../redux/store";
import { ValidateBlockEdge } from ".";
import { Edge, Node, Project } from "../../../../models";

const ShowBlockViewEdge = (edge: Edge) => {
  const project = red.store.getState().projectState.project as Project;
  const splitView = red.store.getState().splitView;
  const isSplitView = splitView.visible as boolean;
  const splitViewNode = splitView.node as Node;
  const selectedNode = project.nodes.find((x) => x.isSelected) as Node;

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
