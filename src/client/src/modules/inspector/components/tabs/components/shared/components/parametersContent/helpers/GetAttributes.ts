import { Attribute } from "@mimirorg/modelbuilder-types";
import { InspectorParametersElement } from "../../../../../../../types";

export const GetAttributes = (element: InspectorParametersElement): Attribute[] => {
  return element.attributes;
};
