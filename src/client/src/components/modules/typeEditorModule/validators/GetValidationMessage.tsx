import { TextResources } from "../../../../assets/text";
import { TypeEditorState } from "../../../../redux/store/typeEditor/types";

const GetValidationMessage = (state: TypeEditorState) => {
  const messages = [];

  if (state.createLibraryType.name === "")
    messages.push(TextResources.TypeEditor_Error_Name);
  if (state.createLibraryType.rdsId === "")
    messages.push(TextResources.TypeEditor_Error_RDS);
  if (state.createLibraryType.terminalTypes.length < 2)
    messages.push(TextResources.TypeEditor_Error_Terminals);

  return messages as string[];
};

export default GetValidationMessage;
