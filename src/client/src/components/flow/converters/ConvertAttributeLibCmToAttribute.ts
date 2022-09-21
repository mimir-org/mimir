import { Attribute } from "@mimirorg/modelbuilder-types";
import { AttributeLibCm, TerminalLibCm } from "@mimirorg/typelibrary-types";
import { TextResources } from "../../../assets/text/TextResources";
import { CreateId } from "../helpers";
import { ConvertUnitLibCmToUnits } from "./";
import { ConvertTypeReference } from "./ConvertTypeReference";

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
    return {
      id: CreateId(),
      iri: null,
      kind: TextResources.KIND_ATTRIBUTE,
      entity: a.name,
      value: "",
      attributeTypeId: a.id,
      attributeTypeIri: a.iri,
      selectedUnitId: "",
      units: ConvertUnitLibCmToUnits(a.units),
      qualifier: a.attributeQualifier,
      source: a.attributeSource,
      condition: a.attributeCondition,
      format: a.attributeFormat,
      discipline: a.discipline,
      nodeId,
      nodeIri: null,
      terminalId: null,
      transportId: null,
      interfaceId: null,
      simpleId: null,
      selectValues: a.selectValues,
      selectType: a.select,
      isLocked: false,
      isLockedStatusBy: null,
      isLockedStatusDate: null,
      domain: null,
      interfaceIri: null,
      simpleIri: null,
      terminalIri: null,
      transportIri: null,
      typeReferences: ConvertTypeReference(a.typeReferences),
    } as Attribute;
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
  if (!libTerminal.attributes.length) return [] as Attribute[];

  return libTerminal.attributes.map((a) => {
    return {
      id: CreateId(),
      iri: null,
      kind: TextResources.KIND_ATTRIBUTE,
      entity: a.name,
      value: "",
      attributeTypeId: a.id,
      attributeTypeIri: a.iri,
      selectedUnitId: "",
      units: ConvertUnitLibCmToUnits(a.units),
      qualifier: a.attributeQualifier,
      source: a.attributeSource,
      condition: a.attributeCondition,
      format: a.attributeFormat,
      discipline: a.discipline,
      nodeId: null,
      nodeIri: null,
      terminalId: id,
      transportId: null,
      interfaceId: null,
      simpleId: null,
      selectValues: a.selectValues,
      selectType: a.select,
      isLocked: false,
      isLockedStatusBy: null,
      isLockedStatusDate: null,
    } as Attribute;
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
    return {
      id: CreateId(),
      iri: null,
      kind: TextResources.KIND_ATTRIBUTE,
      entity: a.name,
      value: "",
      attributeTypeId: a.id,
      attributeTypeIri: a.iri,
      selectedUnitId: "",
      units: ConvertUnitLibCmToUnits(a.units),
      qualifier: a.attributeQualifier,
      source: a.attributeSource,
      condition: a.attributeCondition,
      format: a.attributeFormat,
      discipline: a.discipline,
      nodeId: null,
      nodeIri: null,
      terminalId: null,
      transportId: transportId,
      interfaceId: null,
      simpleId: null,
      selectValues: a.selectValues,
      selectType: a.select,
      isLocked: false,
      isLockedStatusBy: null,
      isLockedStatusDate: null,
      domain: null,
      interfaceIri: null,
      simpleIri: null,
      terminalIri: null,
      transportIri: null,
      typeReferences: ConvertTypeReference(a.typeReferences),
    } as Attribute;
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
    return {
      id: CreateId(),
      iri: null,
      kind: TextResources.KIND_ATTRIBUTE,
      entity: a.name,
      value: "",
      attributeTypeId: a.id,
      attributeTypeIri: a.iri,
      selectedUnitId: "",
      units: ConvertUnitLibCmToUnits(a.units),
      qualifier: a.attributeQualifier,
      source: a.attributeSource,
      condition: a.attributeCondition,
      format: a.attributeFormat,
      discipline: a.discipline,
      nodeId: null,
      nodeIri: null,
      terminalId: null,
      transportId: null,
      interfaceId: interfaceId,
      simpleId: null,
      selectValues: a.selectValues,
      selectType: a.select,
      isLocked: false,
      isLockedStatusBy: null,
      isLockedStatusDate: null,
      domain: null,
      interfaceIri: null,
      simpleIri: null,
      terminalIri: null,
      transportIri: null,
      typeReferences: ConvertTypeReference(a.typeReferences),
    } as Attribute;
  });
};
