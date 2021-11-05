import { IsRelationEdge } from "../../../components/flow/helpers/IsRelationEdge";
import { IsLocation } from "../../../typeEditor/helpers";
import { InspectorElement } from "../types";
import { IsCreateLibraryType, IsNode, IsEdge } from "./IsType";
import { IsProduct } from "../../../helpers";

export const ShouldShowTabs = (element: InspectorElement) => {
  const shouldShowAdmin = !IsCreateLibraryType(element) || !!element.objectType || !!element.locationType;
  const shouldShowParameters =
    IsNode(element) ||
    (IsCreateLibraryType(element) && element.attributeTypes.length > 0) ||
    (IsEdge(element) && !IsRelationEdge(element));
  const shouldShowTerminals =
    IsNode(element) ||
    (IsCreateLibraryType(element) && !IsLocation(element.aspect) && element.terminalTypes.length > 0) ||
    (IsEdge(element) && !IsRelationEdge(element));
  const shouldShowRelations = IsNode(element) || (IsEdge(element) && !IsRelationEdge(element));
  const shouldShowSimpleTypes = (IsNode(element) && IsProduct(element)) || (IsCreateLibraryType(element) && IsProduct(element));

  return [shouldShowAdmin, shouldShowParameters, shouldShowTerminals, shouldShowRelations, shouldShowSimpleTypes];
};
