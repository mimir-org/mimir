import { Attribute, Terminal } from "@mimirorg/modelbuilder-types";

/**
 * "Union" interface for Transport and Interface.
 */
interface HasInputOutputTerminals {
  inputTerminal: Terminal;
  inputTerminalId: string;
  outputTerminal: Terminal;
  outputTerminalId: string;
}

/**
 * Update terminal attribute value and unit of Transport or Interface.
 */
export const GetUpdatedEdgeInnerWithTerminalAttributeValue = <T extends HasInputOutputTerminals>(
  element: T,
  terminalId: string,
  attributeId: string,
  property: string,
  value: string
): T => {
  const UpdateAttribute = (attribute: Attribute) => UpdateAttributeValue(attribute, value, property);
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
  isLocked: boolean,
  isLockedBy: string,
  isLockedStatusDate: Date
): T => {
  const UpdateAttribute = (attribute: Attribute) => UpdateAttributeIsLocked(attribute, isLocked, isLockedBy, isLockedStatusDate);
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

const UpdateAttributeValue = (attribute: Attribute, value: string, property: string): Attribute => {
  return {
    ...attribute,
    [property]: value,
  };
};

export const UpdateAttributeIsLocked = (
  attribute: Attribute,
  isLocked: boolean,
  isLockedStatusBy: string,
  isLockedStatusDate: Date
): Attribute => ({
  ...attribute,
  isLocked,
  isLockedStatusBy,
  isLockedStatusDate,
});
