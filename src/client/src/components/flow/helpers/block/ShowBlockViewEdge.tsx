import store from "../../../../redux/store";
import {
  NODE_TYPE,
  Edge,
  Connector,
  RELATION_TYPE,
  Project,
  Node,
} from "../../../../models/project";

const ShowBlockViewEdge = (edge: Edge): boolean => {
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

  return (
    toNode.type === NODE_TYPE.LOCATION &&
    nodeToConnector?.relationType === RELATION_TYPE.HasLocation &&
    nodeFromConnector?.relationType === RELATION_TYPE.HasLocation &&
    isSplitView &&
    splitViewNode?.type === NODE_TYPE.LOCATION
  );
};

export default ShowBlockViewEdge;
