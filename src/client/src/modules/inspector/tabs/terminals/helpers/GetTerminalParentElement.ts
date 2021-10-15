import { IsEdge, IsNode } from "../../../helpers/IsType";
import { InspectorElement } from "../../../types";

export const GetTerminalParentElement = (element: InspectorElement) => {
  if (IsNode(element)) return element;
  if (IsEdge(element)) {
    if (element.transport) return element.transport;
    if (element.interface) return element.interface;
  }
};
