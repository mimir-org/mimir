import { Node, EDGE_KIND } from "../../../../models";
import { EDGE_TYPE } from "../../../../models/project";

const GetNodes = (elements: any[]) => {
  const nodes: Node[] = [];
  const edgeTypes = Object.values(EDGE_TYPE);

  elements?.forEach((elem) => {
    const isEdge = edgeTypes.some((x) => x === elem.type?.toString() || elem.kind === EDGE_KIND);
    if (!isEdge) nodes.push(elem);
  });

  return nodes;
};

export default GetNodes;
