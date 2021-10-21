import { Attribute } from "../../../../../models";
import { IsCreateLibraryType } from "../../../helpers/IsType";
import { InspectorParametersElement } from "../../../types";

export const GetAttributes = (element: InspectorParametersElement): Attribute[] => {
  if (!IsCreateLibraryType(element)) {
    return element.attributes;
  }
};
