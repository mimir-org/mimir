import { Node, Edge } from "../../models/project";
import { IsAspectNode } from "../../components/flow/helpers";

const SetIndentLevel = (nodes: Node[], edges: Edge[], i: number) => {
  //   console.log("test: ", i);
  let indentCount = 0;
  const node = nodes[i];
  const nodeId = node.id;

  if (edges === null) return null;
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
    if (edge.targetType === node.type) indentCount++;
    id = edge.fromNode;
  }
  return indentCount;
};

export default SetIndentLevel;
