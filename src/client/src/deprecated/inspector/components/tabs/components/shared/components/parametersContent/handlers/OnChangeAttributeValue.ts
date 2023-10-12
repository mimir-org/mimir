import { Dispatch } from "redux";
import { AttributeLibCm } from "@mimirorg/typelibrary-types";
import { Attribute } from "lib";

/**
 * Component to convert a AttributeLibCm to the type Attribute.
 * @param attributeLibCm
 * @param nodeId
 * @returns a converted attribute.
 */
export const ConvertAttributeLibCmToAttribute = (attributeLibCm: AttributeLibCm, nodeId: string, terminalId: string) => {
  if (attributeLibCm == null) return null;
  const attribute = new Attribute(attributeLibCm, terminalId, nodeId);
  return attribute;
};

export const CanRemoveAttribute = (attributeId: string, attributes: Attribute[]): boolean => {
  const existingAttribute = attributes.find((x) => x.id === attributeId);
  if (existingAttribute == null) return false;

  const existingTypes = attributes?.filter((x) => x.attributeType === existingAttribute.attributeType);
  if (existingTypes?.length <= 1) return false;

  return true;
};

export const OnAddNodeAttribute = (
  attributeTypeId: string,
  nodeId: string,
  attributeTypes: AttributeLibCm[],
  dispatch: Dispatch
) => {
  const attributeType = attributeTypes.find((x) => x.id === attributeTypeId);
  if (attributeType == null) return;

  const attribute = ConvertAttributeLibCmToAttribute(attributeType, nodeId, null);
  if (attribute == null) return;

  // dispatch(addNodeAttribute(attribute));
};

export const OnRemoveNodeAttribute = (attributeId: string, nodeId: string, attributes: Attribute[], dispatch: Dispatch) => {
  const canRemove = CanRemoveAttribute(attributeId, attributes);
  // if (canRemove) dispatch(removeNodeAttribute(attributeId, nodeId));
};

export const OnRemoveNodeTerminalAttribute = (
  attributeId: string,
  nodeId: string,
  terminalId: string,
  attributes: Attribute[],
  dispatch: Dispatch
) => {
  const canRemove = CanRemoveAttribute(attributeId, attributes);
  // if (canRemove) dispatch(removeNodeTerminalAttribute(attributeId, nodeId, terminalId));
};

export const OnAddNodeTerminalAttribute = (
  attributeTypeId: string,
  nodeId: string,
  terminalId: string,
  attributeTypes: AttributeLibCm[],
  dispatch: Dispatch
) => {
  const attributeType = attributeTypes.find((x) => x.id === attributeTypeId);
  if (attributeType == null) return;

  const attribute = ConvertAttributeLibCmToAttribute(attributeType, null, terminalId);
  if (attribute == null) return;

  // dispatch(addNodeTerminalAttribute(nodeId, attribute));
};

export const OnChangeNodeAttributeValue = (
  attributeId: string,
  nodeId: string,
  property: string,
  value: string,
  dispatch: Dispatch
) => {
  // dispatch(changeNodeAttributeValue(attributeId, nodeId, property, value));
};

export const OnChangeNodeTerminalAttributeValue = (
  attributeId: string,
  nodeId: string,
  terminalId: string,
  property: string,
  value: string,
  dispatch: Dispatch
) => {
  // dispatch(changeNodeTerminalAttributeValue(attributeId, nodeId, terminalId, property, value));
};
