import { IsEdge, IsNode } from "../../../../../helpers/IsType";
import { InspectorElement, InspectorParametersElement } from "../../../../../types";

export const GetParametersElement = (element: InspectorElement): InspectorParametersElement => {
  if (IsNode(element)) return element;

  if (IsEdge(element)) {
    if (element.transport) return element.transport;
    if (element.interface) return element.interface;
  }
};
