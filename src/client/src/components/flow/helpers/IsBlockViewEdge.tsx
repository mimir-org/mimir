import store from "../../../redux/store";
import {
  NODE_TYPE,
  Edge,
  Connector,
  RELATION_TYPE,
} from "../../../models/project";

const IsBlockViewEdge = (edge: Edge): boolean => {
  const project = store.getState().projectState.project;
  const toNode = project.nodes.find((x) => x.id === edge.toNode);
  const fromNode = project.nodes.find((x) => x.id === edge.fromNode);
  const fromConnector = edge.fromConnector;
  const toConnector = edge.toConnector;

  const nodeFromConnector = fromNode.connectors.find(
    (x) => x.id === fromConnector
  ) as Connector;

  const nodeToConnector = toNode.connectors.find(
    (x) => x.id === toConnector
  ) as Connector;

  return (
    toNode.type === NODE_TYPE.LOCATION &&
    nodeToConnector?.relationType === RELATION_TYPE.HasLocation &&
    nodeFromConnector?.relationType === RELATION_TYPE.HasLocation
  );
};

export default IsBlockViewEdge;
