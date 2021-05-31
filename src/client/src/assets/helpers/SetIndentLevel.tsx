import { Node, Edge } from "../../models/project";
import { IsPartOfTerminal } from "../../components/flow/helpers";

const SetIndentLevel = (nodes: Node[], edges: Edge[], i: number): number => {
  if (!edges) return null;
  let indentCount = 0;
  const node = nodes[i];
  const nodeId = node.id;

  let edge = edges.find((edge) => edge.toNode === nodeId);
  if (!edge) return null;

  let connector = node?.connectors?.find((x) => x.id === edge?.toConnector);

  if (IsPartOfTerminal(connector)) indentCount++;

  let id = edge.fromNode;

  const getParent = () => {
    return id;
  };

  while (edge) {
    edge = edges.find((edge) => edge.toNode === getParent());
    if (!edge) break;
    if (edge.targetType === node.type) indentCount++;

    id = edge.fromNode;
  }
  return indentCount;
};

export default SetIndentLevel;
