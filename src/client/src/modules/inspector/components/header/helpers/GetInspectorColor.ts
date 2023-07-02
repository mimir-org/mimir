import { GetAspectColor } from "assets";
import { AspectColorType } from "../../../../../models";
import { InspectorElement } from "../../../types";
import { AspectObject } from "lib";

/**
 * Component to set the color of the Inspector Header. The color is defined by the Aspect of the selected element.
 * @param nodes
 * @param element
 * @param tabsVisible
 * @returns a color.
 */
export const GetInspectorColor = (nodes: AspectObject[], element: InspectorElement, tabsVisible: boolean) => {
  if (!tabsVisible) return null;
  if (element instanceof AspectObject) return GetAspectColor(element as AspectObject, AspectColorType.Header);
  // if (IsEdge(element)) return GetAspectColor(element.fromNode, AspectColorType.Header); // TODO: Fix this

  return null;
};
