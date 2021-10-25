import { Attribute } from "../../../../../models";
import { IsComposite, IsConnector, IsInterface, IsNode, IsTransport } from "../../../helpers/IsType";
import { InspectorParametersElement } from "../../../types";

export const GetAttributes = (element: InspectorParametersElement): Attribute[] => {
  if (IsNode(element) || IsTransport(element) || IsInterface(element) || IsConnector(element) || IsComposite(element)) {
    return element.attributes;
  }
};
