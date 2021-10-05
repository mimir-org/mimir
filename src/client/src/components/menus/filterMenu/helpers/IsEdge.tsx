import { Edge } from "../../../../models";

const IsEdge = (element) => {
  const edgeType = Object.values(Edge);

  return element.type === undefined || element.type === null || edgeType.some((x) => x === element.type?.toString());
};

export default IsEdge;
