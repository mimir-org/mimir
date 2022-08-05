import { Attribute } from "@mimirorg/modelbuilder-types";
import { AttributeLibCm } from "@mimirorg/typelibrary-types";

/**
 * Component to convert AttributeLibCm to the type Attribute.
 * This convertion is needed when a LibNode is dropped from the Library and converted to a Node.
 * @param attributes
 * @param nodeId
 * @param nodeIri
 * @returns a list of Attributes.
 */
const ConvertAttributeLibCmToAttribute = (attributes: AttributeLibCm[], nodeId: string, nodeIri: string) => {
  if (!attributes.length) return [] as Attribute[];

  return attributes.map((a) => {
    return {
      id: a.id,
      iri: a.iri,
      domain: "",
      kind: a.kind,
      entity: "",
      value: "",
      attributeTypeId: "",
      attributeTypeIri: "",
      selectedUnitId: "",
      units: a.units,
      qualifier: a.attributeQualifier, // TODO: ?
      source: a.attributeSource,
      condition: a.attributeCondition,
      format: a.attributeFormat,
      discipline: a.discipline,
      selectType: a.select, // TODO: ?
      nodeId,
      nodeIri,
      // terminalId: string,
      // terminalIri: string,
      // transportId: string,
      // transportIri: string,
      // interfaceId: string,
      // interfaceIri: string,
      // simpleId: string,
      // simpleIri: string,
      // selectValues: string[],
      // selectType: Select,
      // isLocked: ,
      // isLockedStatusBy: string,
      // isLockedStatusDate: Date,
    } as Attribute;
  });
};

export default ConvertAttributeLibCmToAttribute;
