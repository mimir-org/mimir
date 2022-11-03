import { Dispatch } from "redux";
import { IsConnector, IsEdge, IsInterface, IsNode, IsTransport } from "../../../../../../../helpers/IsType";
import { InspectorElement, InspectorAttributesElement, InspectorTerminalsElement } from "../../../../../../../types";
import {
  changeInterfaceAttributeValue,
  changeInterfaceTerminalAttributeValue,
  changeNodeAttributeValue,
  changeNodeTerminalAttributeValue,
  changeTransportAttributeValue,
  changeTransportTerminalAttributeValue,
} from "../../../../../../../../../redux/store/project/actions";

export const OnChangeNodeAttributeValue = (
  attributeId: string,
  nodeId: string,
  property: string,
  value: string,
  dispatch: Dispatch
) => {
  dispatch(changeNodeAttributeValue(attributeId, nodeId, property, value));
};

export const OnChangeAttributeValue = (
  element: InspectorAttributesElement,
  inspectorParentElement: InspectorElement,
  terminalParentElement: InspectorTerminalsElement,
  attributeId: string,
  value: string,
  unitId: string,
  dispatch: Dispatch
) => {
  if (IsTransport(element) && IsEdge(inspectorParentElement)) {
    dispatch(changeTransportAttributeValue(attributeId, inspectorParentElement, value, unitId));
  } else if (IsInterface(element) && IsEdge(inspectorParentElement)) {
    dispatch(changeInterfaceAttributeValue(attributeId, inspectorParentElement, value, unitId));
  } else if (IsConnector(element) && IsNode(terminalParentElement)) {
    dispatch(changeNodeTerminalAttributeValue(attributeId, element, terminalParentElement, value, unitId));
  } else if (IsConnector(element) && IsEdge(inspectorParentElement) && IsTransport(terminalParentElement)) {
    dispatch(changeTransportTerminalAttributeValue(attributeId, element, inspectorParentElement, value, unitId));
  } else if (IsConnector(element) && IsEdge(inspectorParentElement) && IsInterface(terminalParentElement)) {
    dispatch(changeInterfaceTerminalAttributeValue(attributeId, element, inspectorParentElement, value, unitId));
  }
};
