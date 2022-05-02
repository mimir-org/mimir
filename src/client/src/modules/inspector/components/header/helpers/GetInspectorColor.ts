import { GetAspectColor } from "../../../../../helpers";
import { AspectColorType, Node } from "../../../../../models";
import { IsCreateLibraryType, IsEdge, IsNode } from "../../../helpers/IsType";
import { InspectorElement } from "../../../types";

export const GetInspectorColor = (element: InspectorElement, tabsVisible: boolean) => {
  if (!tabsVisible) return null;

  if (IsNode(element) || IsCreateLibraryType(element)) return GetAspectColor(element as Node, AspectColorType.Header);
  if (IsEdge(element)) return GetAspectColor(element.fromNode, AspectColorType.Header);

  return null;
};
