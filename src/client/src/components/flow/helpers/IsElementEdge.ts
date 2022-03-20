import { FlowElement } from "react-flow-renderer";
import { EDGE_KIND } from "../../../models";

const IsElementEdge = (edgeTypes: string[], element: FlowElement) => {
  return edgeTypes.some((x) => x === element.type?.toString() || element.data?.kind === EDGE_KIND);
};

export default IsElementEdge;
