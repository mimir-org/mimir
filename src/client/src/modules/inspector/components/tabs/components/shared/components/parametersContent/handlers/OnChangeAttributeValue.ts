import { Dispatch } from "redux";
import {
  changeInterfaceAttributeValue,
  changeInterfaceTerminalAttributeValue,
  changeNodeAttributeValue,
  changeNodeTerminalAttributeValue,
  changeTransportAttributeValue,
  changeTransportTerminalAttributeValue,
  addNodeAttribute,
  removeNodeAttribute,
  removeNodeTerminalAttribute,
  addNodeTerminalAttribute,
  addTransportAttribute,
  removeTransportAttribute,
  addInterfaceAttribute,
  removeInterfaceAttribute,
  addInterfaceTerminalAttribute,
  removeInterfaceTerminalAttribute,
  addTransportTerminalAttribute,
  removeTransportTerminalAttribute,
} from "../../../../../../../../../redux/store/project/actions";
import { AttributeLibCm, UnitLibCm } from "@mimirorg/typelibrary-types";
import { CreateId } from "../../../../../../../../../components/flow/helpers";
import { TextResources } from "../../../../../../../../../assets/text/TextResources";
import { ConvertUnitLibCmToUnits } from "../../../../../../../../../components/flow/converters";
import { Attribute, Unit } from "@mimirorg/modelbuilder-types";

/**
 * Find what library units is set as default unnit type at current attribute.
 * @param libUnits
 * @param attributeUnits
 * @returns default unit id or null.
 */
const FindDefaultUnitId = (libUnits: UnitLibCm[], attributeUnits: Unit[]): string => {
  const defaultUnit = libUnits?.find((x) => x.isDefault)?.id ?? null;
  if (defaultUnit == null) return null;

  return attributeUnits?.find((x) => x.unitTypeId === defaultUnit)?.id ?? null;
};

/**
 * Component to convert a AttributeLibCm to the type Attribute.
 * @param attributeLibCm
 * @param nodeId
 * @returns a converted attribute.
 */
export const ConvertAttributeLibCmToAttribute = (
  attributeLibCm: AttributeLibCm,
  nodeId: string,
  terminalId: string,
  transportId: string,
  interfaceId: string
) => {
  if (attributeLibCm == null) return null;

  const attribute: Attribute = {
    id: CreateId(),
    iri: null,
    kind: TextResources.KIND_ATTRIBUTE,
    entity: attributeLibCm.name,
    value: null,
    attributeTypeId: attributeLibCm.id,
    attributeTypeIri: attributeLibCm.iri,
    selectedUnitId: null,
    units: ConvertUnitLibCmToUnits(attributeLibCm.units),
    specifiedScope: null,
    specifiedProvenance: null,
    rangeSpecifying: null,
    regularitySpecified: null,
    nodeId: nodeId,
    nodeIri: null,
    terminalId: terminalId,
    transportId: transportId,
    interfaceId: interfaceId,
    isLocked: false,
    isLockedStatusBy: null,
    isLockedStatusDate: null,
    interfaceIri: null,
    terminalIri: null,
    transportIri: null,
  };

  attribute.selectedUnitId = FindDefaultUnitId(attributeLibCm.units, attribute.units);
  return attribute;
};

export const CanRemoveAttribute = (attributeId: string, attributes: Attribute[]): boolean => {
  const existingAttribute = attributes.find((x) => x.id === attributeId);
  if (existingAttribute == null) return false;

  const existingTypes = attributes?.filter((x) => x.attributeTypeId === existingAttribute.attributeTypeId);
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

  const attribute = ConvertAttributeLibCmToAttribute(attributeType, nodeId, null, null, null);
  if (attribute == null) return;

  dispatch(addNodeAttribute(attribute));
};

export const OnRemoveNodeAttribute = (attributeId: string, nodeId: string, attributes: Attribute[], dispatch: Dispatch) => {
  const canRemove = CanRemoveAttribute(attributeId, attributes);
  if (canRemove) dispatch(removeNodeAttribute(attributeId, nodeId));
};

export const OnRemoveNodeTerminalAttribute = (
  attributeId: string,
  nodeId: string,
  terminalId: string,
  attributes: Attribute[],
  dispatch: Dispatch
) => {
  const canRemove = CanRemoveAttribute(attributeId, attributes);
  if (canRemove) dispatch(removeNodeTerminalAttribute(attributeId, nodeId, terminalId));
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

  const attribute = ConvertAttributeLibCmToAttribute(attributeType, null, terminalId, null, null);
  if (attribute == null) return;

  dispatch(addNodeTerminalAttribute(nodeId, attribute));
};

export const OnAddTransportAttribute = (
  attributeTypeId: string,
  edgeId: string,
  transportId: string,
  attributeTypes: AttributeLibCm[],
  dispatch: Dispatch
) => {
  const attributeType = attributeTypes.find((x) => x.id === attributeTypeId);
  if (attributeType == null) return;

  const attribute = ConvertAttributeLibCmToAttribute(attributeType, null, null, transportId, null);
  if (attribute == null) return;

  dispatch(addTransportAttribute(edgeId, attribute));
};

export const OnRemoveTransportAttribute = (attributeId: string, edgeId: string, attributes: Attribute[], dispatch: Dispatch) => {
  const canRemove = CanRemoveAttribute(attributeId, attributes);
  if (canRemove) dispatch(removeTransportAttribute(edgeId, attributeId));
};

export const OnAddInterfaceAttribute = (
  attributeTypeId: string,
  edgeId: string,
  interfaceId: string,
  attributeTypes: AttributeLibCm[],
  dispatch: Dispatch
) => {
  const attributeType = attributeTypes.find((x) => x.id === attributeTypeId);
  if (attributeType == null) return;

  const attribute = ConvertAttributeLibCmToAttribute(attributeType, null, null, null, interfaceId);
  if (attribute == null) return;

  dispatch(addInterfaceAttribute(edgeId, attribute));
};

export const OnRemoveInterfaceAttribute = (attributeId: string, edgeId: string, attributes: Attribute[], dispatch: Dispatch) => {
  const canRemove = CanRemoveAttribute(attributeId, attributes);
  if (canRemove) dispatch(removeInterfaceAttribute(edgeId, attributeId));
};

export const OnAddInterfaceTerminalAttribute = (
  attributeTypeId: string,
  edgeId: string,
  isInput: boolean,
  terminalId: string,
  attributeTypes: AttributeLibCm[],
  dispatch: Dispatch
) => {
  const attributeType = attributeTypes.find((x) => x.id === attributeTypeId);
  if (attributeType == null) return;

  const attribute = ConvertAttributeLibCmToAttribute(attributeType, null, terminalId, null, null);
  if (attribute == null) return;

  dispatch(addInterfaceTerminalAttribute(edgeId, attribute, isInput));
};

export const OnRemoveInterfaceTerminalAttribute = (
  attributeId: string,
  edgeId: string,
  isInput: boolean,
  attributes: Attribute[],
  dispatch: Dispatch
) => {
  const canRemove = CanRemoveAttribute(attributeId, attributes);
  if (canRemove) dispatch(removeInterfaceTerminalAttribute(edgeId, attributeId, isInput));
};

export const OnAddTransportTerminalAttribute = (
  attributeTypeId: string,
  edgeId: string,
  isInput: boolean,
  terminalId: string,
  attributeTypes: AttributeLibCm[],
  dispatch: Dispatch
) => {
  const attributeType = attributeTypes.find((x) => x.id === attributeTypeId);
  if (attributeType == null) return;

  const attribute = ConvertAttributeLibCmToAttribute(attributeType, null, terminalId, null, null);
  if (attribute == null) return;

  dispatch(addTransportTerminalAttribute(edgeId, attribute, isInput));
};

export const OnRemoveTransportTerminalAttribute = (
  attributeId: string,
  edgeId: string,
  isInput: boolean,
  attributes: Attribute[],
  dispatch: Dispatch
) => {
  const canRemove = CanRemoveAttribute(attributeId, attributes);
  if (canRemove) dispatch(removeTransportTerminalAttribute(edgeId, attributeId, isInput));
};

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
