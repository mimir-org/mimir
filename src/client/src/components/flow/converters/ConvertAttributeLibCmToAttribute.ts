import { Attribute } from "@mimirorg/modelbuilder-types";
import { AttributeLibCm } from "@mimirorg/typelibrary-types";

const ConvertAttributeLibCmToAttribute = (atrributes: AttributeLibCm[]) => {
  const convertedAttributes = [] as Attribute[];

  atrributes.forEach((a) => {
    const convertedAttribute = {
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
      // terminalId: string,
      // terminalIri: string,
      // nodeId: string,
      // nodeIri: string,
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

    convertedAttributes.push(convertedAttribute);
  });

  return convertedAttributes;
};

export default ConvertAttributeLibCmToAttribute;
