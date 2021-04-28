import { Node, Edge } from "../../../../models/project";
import { IsAspectNode } from "../../../flow/helpers";

const SetIndentLevel = (nodes: Node[], edges: Edge[], i: number) => {
  let indentCount = 0;
  const node = nodes[i];
  const nodeId = node.id;
  const type = node.type;

  let edge = edges.find((edge) => edge.toNode === nodeId);

  if (edge === undefined) return null;

  indentCount++;

  let id = edge.fromNode;
  const getChildId = () => {
    return id;
  };

  while (!IsAspectNode(edge.parentType)) {
    edge = edges.find((edge) => edge.toNode === getChildId());
    if (edge === undefined) break;

    if (edge.targetType === type) indentCount++;

    id = edge.fromNode;
  }
  return indentCount;
};

export default SetIndentLevel;
