import store from "../../../../redux/store";
import {
  NODE_TYPE,
  Edge,
  Connector,
  Project,
  Node,
} from "../../../../models/project";
import { ValidateEdge } from ".";

const ShowBlockViewEdge = (edge: Edge): boolean => {
  if (edge.targetType === NODE_TYPE.OFF_PAGE) return;

  const project = store.getState().projectState.project as Project;
  const splitView = store.getState().splitView;
  const isSplitView = splitView.visible as boolean;
  const splitViewNode = splitView.node as Node;

  const toNode = project.nodes.find((x) => x.id === edge.toNode);
  const fromNode = project.nodes.find((x) => x.id === edge.fromNode);

  const fromConnector = edge.fromConnector;
  const toConnector = edge.toConnector;

  const nodeFromConnector = fromNode?.connectors.find(
    (x) => x.id === fromConnector
  ) as Connector;

  const nodeToConnector = toNode.connectors.find(
    (x) => x.id === toConnector
  ) as Connector;

  return ValidateEdge(
    fromNode,
    toNode,
    splitViewNode,
    nodeFromConnector,
    nodeToConnector,
    isSplitView
  );
};

export default ShowBlockViewEdge;
