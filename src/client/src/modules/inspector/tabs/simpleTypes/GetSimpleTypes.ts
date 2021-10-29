import { IsNode } from "../../helpers/IsType";
import { InspectorElement } from "../../types";

export const GetSimpleTypes = (element: InspectorElement) => {
  if (IsNode(element)) return element.composites;
};
