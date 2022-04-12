import { IsOffPage } from "../../../../helpers/Aspects";
import { Edge } from "../../../../models";

export const IsOffPageEdge = (edge: Edge) => {
  return IsOffPage(edge?.fromNode) || IsOffPage(edge?.toNode);
};
