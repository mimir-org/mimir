import { Attribute } from "lib";

import { InspectorAttributesElement } from "../../../../../../../types";

export const GetAttributes = (element: InspectorAttributesElement): Attribute[] => {
  return element?.attributes ?? [];
};
