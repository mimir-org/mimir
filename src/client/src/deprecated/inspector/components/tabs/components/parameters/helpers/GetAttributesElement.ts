import { Block } from "lib";

import { InspectorElement, InspectorAttributesElement } from "../../../../../types";

export const GetAttributesElement = (element: InspectorElement): InspectorAttributesElement => {
  if (element instanceof Block) return element;

  return null;
};
