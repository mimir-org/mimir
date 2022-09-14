import { Attribute } from "@mimirorg/modelbuilder-types";
import { InspectorAttributesElement } from "../../../../../../../types";

export const GetAttributes = (element: InspectorAttributesElement): Attribute[] => {
  return element?.attributes;
};
