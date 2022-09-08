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
  unitId: string,
  dispatch: Dispatch
) => {
  if (IsNode(element)) {
    dispatch(changeNodeAttributeValue(attributeId, element, value, unitId));
  } else if (IsTransport(element) && IsEdge(inspectorParentElement)) {
    dispatch(changeTransportAttributeValue(attributeId, inspectorParentElement, value, unitId));
  } else if (IsInterface(element) && IsEdge(inspectorParentElement)) {
    dispatch(changeInterfaceAttributeValue(attributeId, inspectorParentElement, value, unitId));
  } else if (IsConnector(element) && IsNode(terminalParentElement)) {
    dispatch(changeNodeTerminalAttributeValue(attributeId, element, terminalParentElement, value, unitId));
  } else if (IsConnector(element) && IsEdge(inspectorParentElement) && IsTransport(terminalParentElement)) {
    dispatch(changeTransportTerminalAttributeValue(attributeId, element, inspectorParentElement, value, unitId));
  } else if (IsConnector(element) && IsEdge(inspectorParentElement) && IsInterface(terminalParentElement)) {
    dispatch(changeInterfaceTerminalAttributeValue(attributeId, element, inspectorParentElement, value, unitId));
  } else if (IsSimple(element) && IsNode(inspectorParentElement)) {
    dispatch(changeSimpleAttributeValue(attributeId, element, inspectorParentElement, value, unitId));
  }
};
