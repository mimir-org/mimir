import { AspectObject } from "lib";

import { InspectorElement, InspectorAttributesElement } from "../../../../../types";

export const GetAttributesElement = (element: InspectorElement): InspectorAttributesElement => {
  if (element instanceof AspectObject) return element;

  return null;
};
