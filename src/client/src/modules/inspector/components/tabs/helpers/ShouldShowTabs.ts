import { IsRelationEdge } from "./IsRelationEdge";
import { InspectorElement } from "../../../types";
import { IsEdge, IsNode } from "../../../helpers/IsType";
import { IsProduct } from "../../../../../helpers/Aspects";

export const ShouldShowTabs = (element: InspectorElement) => {
  const shouldShowParameters =
    IsNode(element) || (IsEdge(element) && !IsRelationEdge(element) && !!(element.transport || element.interface));

  const shouldShowTerminals = IsNode(element) || (IsEdge(element) && !IsRelationEdge(element));
  const shouldShowRelations = IsNode(element) || (IsEdge(element) && !IsRelationEdge(element));
  const shouldShowSimpleTypes = IsNode(element) && IsProduct(element);

  return [true, shouldShowParameters, shouldShowTerminals, shouldShowRelations, shouldShowSimpleTypes];
};
