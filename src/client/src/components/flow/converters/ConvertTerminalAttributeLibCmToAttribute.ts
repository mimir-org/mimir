import { Attribute } from "@mimirorg/modelbuilder-types";
import { TerminalLibCm } from "@mimirorg/typelibrary-types";
import { TextResources } from "../../../assets/text/TextResources";
import { CreateId } from "../helpers";

/**
 * Component to convert a Terminal's AttributeLibCm to the type Attribute.
 * This convertion is needed when a LibNode is dropped from the Library and converted to a Node.
 * @param libTerminal
 * @param nodeId
 * @param nodeIri
 * @returns a list of Attributes.
 */
const ConvertTerminalAttributeLibCmToAttribute = (libTerminal: TerminalLibCm, nodeId: string, nodeIri: string) => {
  if (!libTerminal.attributes.length) return [] as Attribute[];

  return libTerminal.attributes.map((a) => {
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
      terminalId: libTerminal.id, // TODO: Check this
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

export default ConvertTerminalAttributeLibCmToAttribute;
