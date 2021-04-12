import { NODE_TYPE } from "../../../../models/project";

const SetIndentLevel = (facets: any, edges: any, i: number) => {
  let indentCount = 0;
  const facetId = facets[i].id;

  let edge = edges.find((edge) => edge.toNode === facetId);
  if (edge === undefined) return null;
  indentCount++;

  let id = edge.fromNode;
  const getChildId = () => {
    return id;
  };

  while (edge.parentType !== NODE_TYPE.ASPECT) {
    edge = edges.find((edge) => edge.toNode === getChildId());
    if (edge !== undefined) {
      indentCount++;
      id = edge.fromNode;
    }
  }
  return indentCount;
};
export default SetIndentLevel;
