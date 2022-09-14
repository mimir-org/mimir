import { IsEdge, IsNode } from "../../../../../helpers/IsType";
import { InspectorElement, InspectorAttributesElement } from "../../../../../types";

export const GetAttributesElement = (element: InspectorElement): InspectorAttributesElement => {
  if (IsNode(element)) return element;

  if (IsEdge(element)) {
    if (element.transport) return element.transport;
    if (element.interface) return element.interface;
  }

  return null;
};
