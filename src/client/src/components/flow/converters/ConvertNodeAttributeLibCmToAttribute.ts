import { Attribute } from "@mimirorg/modelbuilder-types";
import { AttributeLibCm } from "@mimirorg/typelibrary-types";
import { TextResources } from "../../../assets/text/TextResources";
import { CreateId } from "../helpers";

/**
 * Component to convert a Node's AttributeLibCm to the type Attribute.
 * This convertion is needed when a LibNode is dropped from the Library and converted to a Node.
 * @param attributes
 * @param nodeId
 * @param nodeIri
 * @returns a list of Attributes.
 */
const ConvertNodeAttributeLibCmToAttribute = (attributes: AttributeLibCm[], nodeId: string, nodeIri: string) => {
  if (!attributes.length) return [] as Attribute[];

  return attributes.map((a) => {
    return {
      id: CreateId(),
      iri: null,
      kind: TextResources.DISCRIMINATOR_ATTRIBUTE,
      entity: a.name,
      value: "",
      attributeTypeId: a.id,
      attributeTypeIri: a.iri,
      selectedUnitId: "",
      units: a.units,
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
    } as Attribute;
  });
};

export default ConvertNodeAttributeLibCmToAttribute;
