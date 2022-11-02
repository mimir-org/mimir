import { InspectorElement } from "../../../types";
import { IsEdge, IsNode } from "../../../helpers/IsType";
import { AspectColorType } from "../../../../../models";
import { GetAspectColor } from "../../../../../helpers";
import { Node } from "@mimirorg/modelbuilder-types";

/**
 * Component to get the color for the tabs in the Inspector Module.
 * @param nodes
 * @param element
 * @returns a color.
 */
export const GetInspectorTabsColor = (nodes: Node[], element: InspectorElement) => {
  if (IsNode(element)) return GetAspectColor(element, AspectColorType.Tab);
  if (IsEdge(element)) return GetAspectColor(element.fromNode, AspectColorType.Tab);
};
