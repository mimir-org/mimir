import { InspectorElement } from "../../../types";
import { IsCreateLibraryType, IsEdge, IsNode } from "../../../helpers/IsType";
import { AspectColorType, Node } from "../../../../../models";
import { GetAspectColor } from "../../../../../helpers";

/**
 * Component to get the color for the tabs in the Inspector Module.
 * @param nodes
 * @param element
 * @param isOffPage
 * @returns a color.
 */
export const GetInspectorTabsColor = (nodes: Node[], element: InspectorElement, isOffPage: boolean) => {
  if (isOffPage) {
    element = element as Node;
    const parentId = element.parentNodeId;
    const offPageParent = nodes.find((n) => n.id === parentId);
    return GetAspectColor(offPageParent, AspectColorType.Tab);
  }

  if (IsNode(element) || IsCreateLibraryType(element)) return GetAspectColor(element as Node, AspectColorType.Tab);
  if (IsEdge(element)) return GetAspectColor(element.fromNode, AspectColorType.Tab);
};
