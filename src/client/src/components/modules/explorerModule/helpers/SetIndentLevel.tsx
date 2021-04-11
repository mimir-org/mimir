import { NODE_TYPE } from "../../../../models/project";

const SetIndentLevel = (facets: any, edges: any, i: number) => {
  let indentCount = 0;
  const facetId = facets[i].id;

  let edge = edges.find((edge) => edge.toNode === facetId);
  if (edge === undefined) {
    return null;
  }

  indentCount++;
  let id = edge.fromNode;
  console.log("bendik: ", id);

  while (edge.parentType !== NODE_TYPE.ASPECT) {
    // eslint-disable-next-line no-loop-func
    edge = edges.find((edge) => edge.toNode === id); // TODO: check this
    if (edge !== undefined) {
      indentCount++;
      id = edge.fromNode;
    }
  }
  return indentCount;
};
export default SetIndentLevel;
