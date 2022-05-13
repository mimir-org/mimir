import { IsRelationEdge } from "../../../../../components/flow/helpers/IsRelationEdge";
import { InspectorElement } from "../../../types";
import { IsEdge, IsNode } from "../../../helpers/IsType";
import { IsProduct } from "../../../../../helpers";

export const ShouldShowTabs = (element: InspectorElement) => {
  const shouldShowParameters =
    IsNode(element) || (IsEdge(element) && !IsRelationEdge(element) && !!(element.transport || element.interface));
  const shouldShowTerminals = IsNode(element) || (IsEdge(element) && !IsRelationEdge(element));
  const shouldShowRelations = IsNode(element) || (IsEdge(element) && !IsRelationEdge(element));
  const shouldShowSimpleTypes = IsNode(element) && IsProduct(element);

  return [true, shouldShowParameters, shouldShowTerminals, shouldShowRelations, shouldShowSimpleTypes];
};
