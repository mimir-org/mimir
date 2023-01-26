import { IsRelationEdge } from "./IsRelationEdge";
import { InspectorElement } from "../../../types";
import { IsEdge, IsNode } from "../../../../../services";

export const ShouldShowTabs = (element: InspectorElement) => {
  const shouldShowParameters = IsNode(element) || (IsEdge(element) && !IsRelationEdge(element));
  const shouldShowTerminals = IsNode(element) || (IsEdge(element) && !IsRelationEdge(element));
  const shouldShowRelations = IsNode(element) || (IsEdge(element) && !IsRelationEdge(element));

  return [true, shouldShowParameters, shouldShowTerminals, shouldShowRelations];
};
