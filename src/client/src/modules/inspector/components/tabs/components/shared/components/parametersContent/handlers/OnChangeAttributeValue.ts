import { Dispatch } from "redux";
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

export const OnChangeNodeTerminalAttributeValue = (
  attributeId: string,
  nodeId: string,
  terminalId: string,
  property: string,
  value: string,
  dispatch: Dispatch
) => {
  dispatch(changeNodeTerminalAttributeValue(attributeId, nodeId, terminalId, property, value));
};

export const OnChangeTransportAttributeValue = (
  attributeId: string,
  edgeId: string,
  property: string,
  value: string,
  dispatch: Dispatch
) => {
  dispatch(changeTransportAttributeValue(attributeId, edgeId, property, value));
};

export const OnChangeInterfaceAttributeValue = (
  attributeId: string,
  edgeId: string,
  property: string,
  value: string,
  dispatch: Dispatch
) => {
  dispatch(changeInterfaceAttributeValue(attributeId, edgeId, property, value));
};

export const OnChangeTransportTerminalAttributeValue = (
  attributeId: string,
  edgeId: string,
  terminalId: string,
  property: string,
  value: string,
  dispatch: Dispatch
) => {
  dispatch(changeTransportTerminalAttributeValue(attributeId, edgeId, terminalId, property, value));
};

export const OnChangeInterfaceTerminalAttributeValue = (
  attributeId: string,
  edgeId: string,
  terminalId: string,
  property: string,
  value: string,
  dispatch: Dispatch
) => {
  dispatch(changeInterfaceTerminalAttributeValue(attributeId, edgeId, terminalId, property, value));
};
