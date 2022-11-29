import { GetAspectColor } from "../../../../../helpers";
import { AspectColorType } from "../../../../../models";
import { IsEdge, IsNode } from "../../../helpers/IsType";
import { InspectorElement } from "../../../types";
import { Node } from "@mimirorg/modelbuilder-types";

/**
 * Component to set the color of the Inspector Header. The color is defined by the Aspect of the selected element.
 * @param nodes
 * @param element
 * @param tabsVisible
 * @returns a color.
 */
export const GetInspectorColor = (nodes: Node[], element: InspectorElement, tabsVisible: boolean) => {
  if (!tabsVisible) return null;
  if (IsNode(element)) return GetAspectColor(element as Node, AspectColorType.Header);
  if (IsEdge(element)) return GetAspectColor(element.fromNode, AspectColorType.Header);

  return null;
};
