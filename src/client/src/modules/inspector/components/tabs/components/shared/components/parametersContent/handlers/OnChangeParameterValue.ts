import { Dispatch } from "redux";
import { IsConnector, IsEdge, IsInterface, IsNode, IsSimple, IsTransport } from "../../../../../../../helpers/IsType";
import { InspectorElement, InspectorParametersElement, InspectorTerminalsElement } from "../../../../../../../types";
import {
  changeInterfaceAttributeValue,
  changeInterfaceTerminalAttributeValue,
  changeNodeAttributeValue,
  changeNodeTerminalAttributeValue,
  changeSimpleAttributeValue,
  changeTransportAttributeValue,
  changeTransportTerminalAttributeValue,
} from "../../../../../../../../../redux/store/project/actions";

export const OnChangeParameterValue = (
  element: InspectorParametersElement,
  inspectorParentElement: InspectorElement,
  terminalParentElement: InspectorTerminalsElement,
  attributeId: string,
  value: string,
  unit: string,
  dispatch: Dispatch
) => {
  if (IsNode(element)) {
    dispatch(changeNodeAttributeValue(attributeId, element, value, unit));
  } else if (IsTransport(element) && IsEdge(inspectorParentElement)) {
    dispatch(changeTransportAttributeValue(attributeId, inspectorParentElement, value, unit));
  } else if (IsInterface(element) && IsEdge(inspectorParentElement)) {
    dispatch(changeInterfaceAttributeValue(attributeId, inspectorParentElement, value, unit));
  } else if (IsConnector(element) && IsNode(terminalParentElement)) {
    dispatch(changeNodeTerminalAttributeValue(attributeId, element, terminalParentElement, value, unit));
  } else if (IsConnector(element) && IsEdge(inspectorParentElement) && IsTransport(terminalParentElement)) {
    dispatch(changeTransportTerminalAttributeValue(attributeId, element, inspectorParentElement, value, unit));
  } else if (IsConnector(element) && IsEdge(inspectorParentElement) && IsInterface(terminalParentElement)) {
    dispatch(changeInterfaceTerminalAttributeValue(attributeId, element, inspectorParentElement, value, unit));
  } else if (IsSimple(element) && IsNode(inspectorParentElement)) {
    dispatch(changeSimpleAttributeValue(attributeId, element, inspectorParentElement, value, unit));
  }
};
