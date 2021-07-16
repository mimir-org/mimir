import { TextResources } from "../../../../assets/text";
import { Status } from "../../../../models";
import { TypeEditorState } from "../../../../redux/store/typeEditor/types";
import { IsInterface, IsNotSet, IsObjectBlock } from "../helpers";
import { ValidateTerminalType } from "./";

const GetValidationMessage = (state: TypeEditorState) => {
  const terminals = state.createLibraryType.terminalTypes;
  const objectType = state.createLibraryType.objectType;
  const messages = [];

  // Check name
  if (state.createLibraryType.name === "")
    messages.push(TextResources.TypeEditor_Error_Name);

  // Check RDS
  if (state.createLibraryType.rdsId === "")
    messages.push(TextResources.TypeEditor_Error_RDS);

  // Check status type
  if (state.createLibraryType.status === Status.NotSet)
    messages.push(TextResources.TypeEditor_Error_Status);

  // Check amount of attributes
  if (!IsInterface(objectType)) {
    if (state.createLibraryType.attributeTypes.length < 1)
      messages.push(TextResources.TypeEditor_Error_Attributes);
  }

  // Check amount of terminals
  if (IsObjectBlock(objectType) || IsNotSet(objectType)) {
    if (terminals.length < 2)
      messages.push(TextResources.TypeEditor_Error_Terminals);
  }

  // Check type of terminals
  if (IsObjectBlock(objectType)) {
    if (!ValidateTerminalType(terminals))
      messages.push(TextResources.TypeEditor_Error_TerminalsType);
  }

  if (IsInterface(objectType)) {
    if (state.createLibraryType.terminalTypeId === null)
      messages.push(TextResources.TypeEditor_Error_Terminals_Interface);
  }

  return messages as string[];
};

export default GetValidationMessage;
