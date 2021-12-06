import { Edge } from "../../../../../models";

const OnClickTransport = (edge: Edge, setActiveFlowElement: (elementId: string) => void) => {
  setActiveFlowElement(edge.id);
};

export { OnClickTransport };
