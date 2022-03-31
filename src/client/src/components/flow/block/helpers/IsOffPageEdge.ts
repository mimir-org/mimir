import { IsOffPage } from "../../../../helpers/CheckTypes";
import { Edge } from "../../../../models";

const IsOffPageEdge = (edge: Edge) => {
  return IsOffPage(edge?.fromNode) || IsOffPage(edge?.toNode);
};

export default IsOffPageEdge;
