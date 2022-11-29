import { Attribute, Unit } from "@mimirorg/modelbuilder-types";
import { AttributeLibCm, TerminalLibCm, UnitLibCm } from "@mimirorg/typelibrary-types";
import { TextResources } from "../../../assets/text/TextResources";
import { CreateId } from "../helpers";
import { ConvertUnitLibCmToUnits } from "./";

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
 * Component to convert Node's AttributeLibCm to the type Attribute.
 * This convertion is needed when a LibNode is dropped from the Library and converted to a Node,
 * or when a Transport is created via the creation of an Edge between two nodes.
 * @param attributes
 * @param nodeId
 * @returns a list of Attributes.
 */
export const ConvertNodeAttributeLibCmToAttribute = (attributes: AttributeLibCm[], nodeId: string) => {
  if (!attributes || !attributes.length) return [] as Attribute[];

  return attributes.map((a) => {
    const attribute: Attribute = {
      id: CreateId(),
      iri: null,
      kind: TextResources.KIND_ATTRIBUTE,
      entity: a.name,
      value: null,
      attributeTypeId: a.id,
      attributeTypeIri: a.iri,
      selectedUnitId: null,
      units: ConvertUnitLibCmToUnits(a.units),
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
    attribute.selectedUnitId = FindDefaultUnitId(a.units, attribute.units);
    return attribute;
  });
};

/**
 * Component to convert a Terminal's AttributeLibCm to the type Attribute.
 * This convertion is needed when a LibNode is dropped from the Library and converted to a Node.
 * @param libTerminal
 * @param id
 * @returns a list of Attributes.
 */
export const ConvertTerminalAttributeLibCmToAttribute = (libTerminal: TerminalLibCm, id: string) => {
  if (libTerminal && libTerminal.attributes && !libTerminal.attributes.length) return [] as Attribute[];

  return libTerminal.attributes.map((a) => {
    const attribute: Attribute = {
      id: CreateId(),
      iri: null,
      kind: TextResources.KIND_ATTRIBUTE,
      entity: a.name,
      value: null,
      attributeTypeId: a.id,
      attributeTypeIri: a.iri,
      selectedUnitId: null,
      units: ConvertUnitLibCmToUnits(a.units),
      specifiedScope: null,
      specifiedProvenance: null,
      rangeSpecifying: null,
      regularitySpecified: null,
      nodeId: null,
      nodeIri: null,
      terminalId: id,
      transportId: null,
      interfaceId: null,
      isLocked: false,
      isLockedStatusBy: null,
      isLockedStatusDate: null,
      terminalIri: null,
      transportIri: null,
      interfaceIri: null,
    };
    attribute.selectedUnitId = FindDefaultUnitId(a.units, attribute.units);
    return attribute;
  });
};

/**
 * Component to convert Transport's AttributeLibCm to the type Attribute.
 * This convertion is needed when a LibNode is dropped from the Library and converted to a Node,
 * or when a Transport is created via the creation of an Edge between two nodes.
 * @param attributes
 * @param transportId
 * @returns a list of Attributes.
 */
export const ConvertTransportAttributeLibCmToAttribute = (attributes: AttributeLibCm[], transportId: string) => {
  if (!attributes || !attributes.length) return [] as Attribute[];

  return attributes.map((a) => {
    const attribute: Attribute = {
      id: CreateId(),
      iri: null,
      kind: TextResources.KIND_ATTRIBUTE,
      entity: a.name,
      value: null,
      attributeTypeId: a.id,
      attributeTypeIri: a.iri,
      selectedUnitId: null,
      units: ConvertUnitLibCmToUnits(a.units),
      specifiedScope: null,
      specifiedProvenance: null,
      rangeSpecifying: null,
      regularitySpecified: null,
      nodeId: null,
      nodeIri: null,
      terminalId: null,
      transportId: transportId,
      interfaceId: null,
      isLocked: false,
      isLockedStatusBy: null,
      isLockedStatusDate: null,
      interfaceIri: null,
      terminalIri: null,
      transportIri: null,
    };
    attribute.selectedUnitId = FindDefaultUnitId(a.units, attribute.units);
    return attribute;
  });
};

/**
 * Component to convert Interface's AttributeLibCm to the type Attribute.
 * This convertion is needed when a LibNode is dropped from the Library and converted to a Node,
 * or when a Transport is created via the creation of an Edge between two nodes.
 * @param attributes
 * @param interfaceId
 * @returns a list of Attributes.
 */
export const ConvertInterfaceAttributeLibCmToAttribute = (attributes: AttributeLibCm[], interfaceId: string) => {
  if (!attributes || !attributes.length) return [] as Attribute[];

  return attributes.map((a) => {
    const attribute: Attribute = {
      id: CreateId(),
      iri: null,
      kind: TextResources.KIND_ATTRIBUTE,
      entity: a.name,
      value: null,
      attributeTypeId: a.id,
      attributeTypeIri: a.iri,
      selectedUnitId: null,
      units: ConvertUnitLibCmToUnits(a.units),
      specifiedScope: null,
      specifiedProvenance: null,
      rangeSpecifying: null,
      regularitySpecified: null,
      nodeId: null,
      nodeIri: null,
      terminalId: null,
      transportId: null,
      interfaceId: interfaceId,
      isLocked: false,
      isLockedStatusBy: null,
      isLockedStatusDate: null,
      interfaceIri: null,
      terminalIri: null,
      transportIri: null,
    };
    attribute.selectedUnitId = FindDefaultUnitId(a.units, attribute.units);
    return attribute;
  });
};
