import { CONNECTOR_TYPE, Node, Edge } from "../../models/project";
import store from "../../redux/store";
import { IsPartOfTerminal } from "../../components/flow/helpers";

const SetIndentLevel = (node: Node, count: number): number => {
  const connector = node.connectors?.find(
    (x) => IsPartOfTerminal(x) && x.type === CONNECTOR_TYPE.INPUT
  );

  if (connector === null) return count;

  const edge = store
    .getState()
    .projectState.project.edges.find((x) => x.toNode === node.id) as Edge;

  if (!edge) return count;
  else count++;

  const nextNode = store
    .getState()
    .projectState.project.nodes.find((x) => x.id === edge.fromNode);

  if (!nextNode) return count;

  return SetIndentLevel(nextNode, count);
};

export default SetIndentLevel;
