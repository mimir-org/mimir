import { InspectorElement } from "../../../types";
import { IsEdge, IsNode } from "../../../helpers/IsType";
import { AspectColorType } from "../../../../../models";
import { GetAspectColor } from "../../../../../helpers";
import { Node } from "@mimirorg/modelbuilder-types";

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

  if (IsNode(element)) return GetAspectColor(element, AspectColorType.Tab);
  if (IsEdge(element)) return GetAspectColor(element.fromNode, AspectColorType.Tab);
};
