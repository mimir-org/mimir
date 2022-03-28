import { TypeEditorState } from "../redux/types";
import { IsFunction, IsInterface, IsLocation, IsNotSet, IsObjectBlock, IsTransport } from "../helpers";
import { TypeEditorTextResources } from "../assets/TypeEditorTextResources";

const GetValidationMessage = (state: TypeEditorState) => {
  const terminals = state.createLibraryType.terminalTypes;
  const objectType = state.createLibraryType.objectType;
  const aspect = state.createLibraryType.aspect;
  const messages = [];

  // Check name
  if (state.createLibraryType.name === "") messages.push(TypeEditorTextResources.ERROR_NAME);

  // Check RDS
  if (state.createLibraryType.rdsId === "") messages.push(TypeEditorTextResources.ERROR_RDS);

  // Check amount of attributes
  if (!IsInterface(objectType)) {
    if (state.createLibraryType.attributeTypes && state.createLibraryType.attributeTypes.length < 1)
      messages.push(TypeEditorTextResources.ERROR_ATTRIBUTES);
  }

  // Check location attributes
  if (IsLocation(aspect)) {
    if (state.createLibraryType.predefinedAttributes.length === 0)
      messages.push(TypeEditorTextResources.ERROR_LOCATION_ATTRIBUTES);
  }

  if (IsFunction(aspect)) {
    // Check number of terminals
    if (IsObjectBlock(objectType) || IsNotSet(objectType)) {
      if (terminals.length < 2) messages.push(TypeEditorTextResources.ERROR_TERMINALS);
    }

    // Check type of terminals
    if (IsObjectBlock(objectType)) {
      // TO DO: Some validation here
      if (!terminals) messages.push(TypeEditorTextResources.ERROR_TERMINALSTYPE);
    }
    // Check interface terminal type
    if (IsInterface(objectType) || IsTransport(objectType)) {
      if (state.createLibraryType.terminalTypeId === null) messages.push(TypeEditorTextResources.ERROR_TERMINALS_INTERFACE);
    }
  }

  return messages as string[];
};

export default GetValidationMessage;
