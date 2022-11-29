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
export const ConvertAttributeLibCmToAttribute = (attributeLibCm: AttributeLibCm, nodeId: string) => {
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
    nodeId,
    nodeIri: null,
    terminalId: null,
    transportId: null,
    interfaceId: null,
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

export const OnAddNodeAttribute = (
  attributeTypeId: string,
  nodeId: string,
  attributeTypes: AttributeLibCm[],
  dispatch: Dispatch
) => {
  const attributeType = attributeTypes.find((x) => x.id === attributeTypeId);
  if (attributeType == null) return;

  const attribute = ConvertAttributeLibCmToAttribute(attributeType, nodeId);
  if (attribute == null) return;

  dispatch(addNodeAttribute(attribute));
};

export const OnRemoveNodeAttribute = (attributeId: string, nodeId: string, attributes: Attribute[], dispatch: Dispatch) => {
  const existingAttribute = attributes.find((x) => x.id === attributeId);
  if (existingAttribute == null) return;

  const existingTypes = attributes?.filter((x) => x.attributeTypeId === existingAttribute.attributeTypeId);
  if (existingTypes?.length <= 1) return;

  dispatch(removeNodeAttribute(attributeId, nodeId));
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
