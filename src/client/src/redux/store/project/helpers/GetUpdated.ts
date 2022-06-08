import { Attribute, Connector } from "@mimirorg/modelbuilder-types";

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
  // if (element.inputTerminalId === terminalId) {
  //   element.inputTerminal.attributes = element.inputTerminal.attributes.map((attribute) =>
  //     MapAttribute(attribute, attributeId, UpdateAttribute)
  //   );
  // } else {
  //   element.outputTerminal.attributes = element.outputTerminal.attributes.map((attribute) =>
  //     MapAttribute(attribute, attributeId, UpdateAttribute)
  //   );
  // }
  // TODO: fix
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
  // if (element.inputTerminalId === terminalId) {
  //   element.inputTerminal.attributes = element.inputTerminal.attributes.map((attribute) =>
  //     MapAttribute(attribute, attributeId, UpdateAttribute)
  //   );
  // } else {
  //   element.outputTerminal.attributes = element.outputTerminal.attributes.map((attribute) =>
  //     MapAttribute(attribute, attributeId, UpdateAttribute)
  //   );
  // }
  return element;
};

const MapAttribute = (attribute: Attribute, attributeId: string, updateFunc: (attribute: Attribute) => Attribute) =>
  attribute.id === attributeId ? updateFunc(attribute) : attribute;

const UpdateAttributeValue = (attribute: Attribute, value: string, unitId: string): Attribute => ({
  ...attribute,
  value,
  selectedUnitId: unitId,
});

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
