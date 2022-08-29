import { Attribute } from "@mimirorg/modelbuilder-types";
import { AttributeLibCm, SimpleLibCm, TerminalLibCm } from "@mimirorg/typelibrary-types";
import { TextResources } from "../../../assets/text/TextResources";
import { CreateId } from "../helpers";
import ConvertUnitLibCmToUnit from "./ConvertUnitLibCmToUnit";

/**
 * Component to convert a Node's AttributeLibCm to the type Attribute.
 * This convertion is needed when a LibNode is dropped from the Library and converted to a Node.
 * @param attributes
 * @param nodeId
 * @param nodeIri
 * @returns a list of Attributes.
 */
export const ConvertNodeAttributeLibCmToAttribute = (attributes: AttributeLibCm[], nodeId: string, nodeIri: string) => {
  if (!attributes.length) return [] as Attribute[];

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
      units: ConvertUnitLibCmToUnit(a.units),
      qualifier: a.attributeQualifier,
      source: a.attributeSource,
      condition: a.attributeCondition,
      format: a.attributeFormat,
      discipline: a.discipline,
      nodeId,
      nodeIri,
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
      units: ConvertUnitLibCmToUnit(a.units),
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
 * Component to convert a Simple's AttributeLibCm to the type Attribute.
 * This convertion is needed when a LibNode is dropped from the Library and converted to a Node.
 * @param simple
 * @param nodeId
 * @param nodeIri
 * @returns a list of Attributes.
 */
export const ConvertSimpleAttributeLibCmToAttribute = (simple: SimpleLibCm, nodeId: string, nodeIri: string) => {
  if (!simple.attributes.length) return [] as Attribute[];

  return simple.attributes.map((a) => {
    return {
      id: CreateId(),
      iri: null,
      kind: TextResources.KIND_ATTRIBUTE,
      entity: a.name,
      value: "",
      attributeTypeId: a.id,
      attributeTypeIri: a.iri,
      selectedUnitId: "",
      units: ConvertUnitLibCmToUnit(a.units),
      qualifier: a.attributeQualifier,
      source: a.attributeSource,
      condition: a.attributeCondition,
      format: a.attributeFormat,
      discipline: a.discipline,
      nodeId,
      nodeIri,
      terminalId: null,
      transportId: null,
      interfaceId: null,
      simpleId: simple.id,
      selectValues: a.selectValues,
      selectType: a.select,
      isLocked: false,
      isLockedStatusBy: null,
      isLockedStatusDate: null,
    } as Attribute;
  });
};
