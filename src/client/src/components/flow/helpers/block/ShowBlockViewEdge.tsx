import store from "../../../../redux/store";
import { ValidateEdge } from ".";
import {
  NODE_TYPE,
  Edge,
  Connector,
  Project,
  Node,
} from "../../../../models/project";

const ShowBlockViewEdge = (edge: Edge): boolean => {
  if (edge.targetType === NODE_TYPE.OFF_PAGE) return;

  const project = store.getState().projectState.project as Project;
  const splitView = store.getState().splitView;
  const isSplitView = splitView.visible as boolean;
  const splitViewNode = splitView.node as Node;
  const selectedNode = project.nodes.find((x) => x.isSelected) as Node;

  const toNode = project.nodes.find((x) => x.id === edge.toNode);
  const fromNode = project.nodes.find((x) => x.id === edge.fromNode);

  const fromConnectorId = edge.fromConnector;
  const toConnectorId = edge.toConnector;

  const fromConnector = fromNode?.connectors.find(
    (x) => x.id === fromConnectorId
  ) as Connector;

  const toConnector = toNode?.connectors.find(
    (x) => x.id === toConnectorId
  ) as Connector;

  return ValidateEdge(
    selectedNode,
    fromNode,
    toNode,
    splitViewNode,
    fromConnector,
    toConnector,
    isSplitView
  );
};

export default ShowBlockViewEdge;

// d68e65d6-307a-c08d-f76b-6823d792b821¨

// 30206574-b907-a2ee-2dba-b349e37406ef
