import { IsEdge, IsNode } from "../../../../../helpers/IsType";
import { InspectorElement } from "../../../../../types";

export const GetConnectors = (element: InspectorElement) => {
  if (IsNode(element)) return element.connectors;
  if (IsEdge(element)) return [element.fromConnector, element.toConnector];
};
