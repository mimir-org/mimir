import { GetAspectColor } from "../../../../../helpers";
import { AspectColorType, Node } from "../../../../../models";
import { IsCreateLibraryType, IsEdge, IsNode } from "../../../helpers/IsType";
import { InspectorElement } from "../../../types";

/**
 * Component to set the color of the Inspector Header. The color is defined by the Aspect of the selected element.
 * @param nodes
 * @param element
 * @param IsOffPage
 * @param tabsVisible
 * @returns a color.
 */
export const GetInspectorColor = (nodes: Node[], element: InspectorElement, IsOffPage: boolean, tabsVisible: boolean) => {
  if (!tabsVisible) return null;

  if (IsOffPage) {
    element = element as Node;
    const parentId = element.parentNodeId;
    const offPageParent = nodes.find((n) => n.id === parentId);
    return GetAspectColor(offPageParent, AspectColorType.Header);
  }

  if (IsNode(element) || IsCreateLibraryType(element)) return GetAspectColor(element as Node, AspectColorType.Header);
  if (IsEdge(element)) return GetAspectColor(element.fromNode, AspectColorType.Header);

  return null;
};
