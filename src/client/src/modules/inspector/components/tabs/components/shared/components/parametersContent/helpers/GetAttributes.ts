import { IsCreateLibraryType } from "../../../../../../../helpers/IsType";
import { AttributeLikeItem, InspectorParametersElement } from "../../../../../../../types";

export const GetAttributes = (element: InspectorParametersElement): AttributeLikeItem[] => {
  if (!IsCreateLibraryType(element)) return element.attributes;
};
