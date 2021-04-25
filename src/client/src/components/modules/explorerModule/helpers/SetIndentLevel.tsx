import { Node, Edge } from "../../../../models/project";
import { isAspectNode } from "../../../flow/utils";

const SetIndentLevel = (facets: Node[], edges: Edge[], i: number) => {
  let indentCount = 0;
  const facetId = facets[i].id;
  let edge = edges.find((edge: { toNode: string }) => edge.toNode === facetId);

  if (edge === undefined) return null;

  indentCount++;

  let id = edge.fromNode;
  const getChildId = (): string => {
    return id;
  };

  while (!isAspectNode(edge.parentType)) {
    edge = edges.find((edge) => edge.toNode === getChildId());
    // console.log("test edge: ", edge);
    if (edge !== undefined) {
      indentCount++;
      id = edge.fromNode;
    }
  }
  return indentCount;
};
export default SetIndentLevel;
