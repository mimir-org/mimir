import { Node, Edge } from "../../models/project";

const SetIndentLevel = (nodes: Node[], edges: Edge[], i: number) => {
  if (!edges) return null;
  let indentCount = 0;
  const node = nodes[i];
  const nodeId = node.id;

  let edge = edges.find((edge) => edge.toNode === nodeId);
  if (edge === undefined) return null;

  indentCount++;
  let id = edge.fromNode;

  const getParent = () => {
    return id;
  };

  while (edge) {
    edge = edges.find((edge) => edge.toNode === getParent());
    if (edge === undefined) break;
    if (edge.targetType === node.type) indentCount++;
    id = edge.fromNode;
  }
  return indentCount;
};

export default SetIndentLevel;
