import { Edge } from "../../../../../../../models";

export const OnClickTransport = (edge: Edge, setActiveFlowElement: (elementId: string) => void) => {
  setActiveFlowElement(edge.id);
};
