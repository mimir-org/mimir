import { TextResources } from "../../../../assets/text";
import { Status } from "../../../../models";
import { TypeEditorState } from "../../../../redux/store/typeEditor/types";
import { ValidateTerminalType } from "./";

const GetValidationMessage = (state: TypeEditorState) => {
  const terminals = state.createLibraryType.terminalTypes;
  const messages = [];

  // Check name
  if (state.createLibraryType.name === "")
    messages.push(TextResources.TypeEditor_Error_Name);

  // Check RDS
  if (state.createLibraryType.rdsId === "")
    messages.push(TextResources.TypeEditor_Error_RDS);

  // Check amount of attributes
  if (state.createLibraryType.attributeTypes.length < 1)
    messages.push(TextResources.TypeEditor_Error_Attributes);

  // Check status type
  if (state.createLibraryType.status === Status.NotSet)
    messages.push(TextResources.TypeEditor_Error_Status);

  // Check amount of terminals
  if (terminals.length < 2)
    messages.push(TextResources.TypeEditor_Error_Terminals);

  // Check type of terminals
  if (!ValidateTerminalType(terminals))
    messages.push(TextResources.TypeEditor_Error_TerminalsType);

  return messages as string[];
};

export default GetValidationMessage;
