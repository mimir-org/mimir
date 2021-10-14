import { Attribute, Connector } from "../../../../models";

/**
 * "Union" interface for Transport and Interface.
 */
interface HasInputOutputTerminals {
  inputTerminal: Connector;
  inputTerminalId: string;
  outputTerminal: Connector;
  outputTerminalId: string;
}

/**
 * Update terminal attribute value and unit of Transport or Interface.
 */
export const GetUpdatedEdgeInnerWithTerminalAttributeValue = <T extends HasInputOutputTerminals>(
  element: T,
  terminalId: string,
  attributeId: string,
  value: string,
  unitId: string
): T => {
  const UpdateAttribute = (attribute: Attribute) => UpdateAttributeValue(attribute, value, unitId);
  if (element.inputTerminalId === terminalId) {
    element.inputTerminal.attributes = element.inputTerminal.attributes.map((attribute) =>
      MapAttribute(attribute, attributeId, UpdateAttribute)
    );
  } else {
    element.outputTerminal.attributes = element.outputTerminal.attributes.map((attribute) =>
      MapAttribute(attribute, attributeId, UpdateAttribute)
    );
  }
  return element;
};

/**
 * Update terminal attribute isLocked of Transport or Interface.
 */
export const GetUpdatedEdgeInnerWithTerminalAttributeIsLocked = <T extends HasInputOutputTerminals>(
  element: T,
  terminalId: string,
  attributeId: string,
  isLocked: boolean
): T => {
  const UpdateAttribute = (attribute: Attribute) => UpdateAttributeIsLocked(attribute, isLocked);
  if (element.inputTerminalId === terminalId) {
    element.inputTerminal.attributes = element.inputTerminal.attributes.map((attribute) =>
      MapAttribute(attribute, attributeId, UpdateAttribute)
    );
  } else {
    element.outputTerminal.attributes = element.outputTerminal.attributes.map((attribute) =>
      MapAttribute(attribute, attributeId, UpdateAttribute)
    );
  }
  return element;
};

const MapAttribute = (attribute: Attribute, attributeId: string, updateFunc: (attribute: Attribute) => Attribute) =>
  attribute.id === attributeId ? updateFunc(attribute) : attribute;

const UpdateAttributeValue = (attribute: Attribute, value: string, unitId: string): Attribute => ({
  ...attribute,
  value,
  selectedUnitId: unitId,
});

const UpdateAttributeIsLocked = (attribute: Attribute, isLocked: boolean): Attribute => ({
  ...attribute,
  isLocked,
});
