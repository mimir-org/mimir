import { InspectorElement } from "../../../types";
import { AspectColorType } from "../../../../../models";
import { GetAspectColor } from "../../../../../helpers";
import { AspectObject, Connection } from "lib";
import { Color } from "assets/color/Color";

/**
 * Component to get the color for the tabs in the Inspector Module.
 * @param nodes
 * @param element
 * @returns a color.
 */
export const GetInspectorTabsColor = (nodes: AspectObject[], element: InspectorElement) => {
  return Color.LEMON_YELLOW;
  // if (element instanceof AspectObject) return GetAspectColor(element, AspectColorType.Tab);
  // if (element instanceof Connection) return GetAspectColor(element.fromNode, AspectColorType.Tab);
};
