import { TextResources } from "../../../../assets/text";
import { TypeEditorState } from "../../../../redux/store/typeEditor/types";
// import { ValidateTerminalType } from "./";
import {
  IsFunction,
  IsInterface,
  IsLocation,
  IsNotSet,
  IsObjectBlock,
  IsTransport,
  ModeEdit,
  ModeNew,
} from "../helpers";

const GetValidationMessage = (state: TypeEditorState) => {
  const mode = state.mode;
  const terminals = ModeEdit(mode)
    ? state.selectedNode.terminalTypes
    : state.createLibraryType.terminalTypes;
  const objectType = ModeEdit(mode)
    ? state.selectedNode.objectType
    : state.createLibraryType.objectType;
  const aspect = ModeEdit(mode)
    ? state.selectedNode.aspect
    : state.createLibraryType.aspect;
  const messages = [];

  // Check name
  if (
    (ModeNew(mode) && state.createLibraryType.name === "") ||
    (ModeEdit(mode) && state.selectedNode.name === "")
  )
    messages.push(TextResources.TypeEditor_Error_Name);

  // Check RDS
  if (
    (ModeNew(mode) && state.createLibraryType.rdsId === "") ||
    (ModeEdit(mode) && state.selectedNode.rdsId === "")
  )
    messages.push(TextResources.TypeEditor_Error_RDS);

  // Check amount of attributes
  if (!IsInterface(objectType)) {
    if (
      (ModeNew(mode) &&
        state.createLibraryType.attributeTypes &&
        state.createLibraryType.attributeTypes.length < 1) ||
      (ModeEdit(mode) &&
        state.selectedNode.attributeTypes &&
        state.selectedNode.attributeTypes.length < 1)
    )
      messages.push(TextResources.TypeEditor_Error_Attributes);
  }

  // Check location attributes
  if (IsLocation(aspect)) {
    if (
      (ModeNew(mode) &&
        state.createLibraryType.predefinedAttributes.length === 0) ||
      (ModeEdit(mode) && state.selectedNode.predefinedAttributes.length === 0)
    )
      messages.push(TextResources.TypeEditor_Error_Location_Attributes);
  }

  if (IsFunction(aspect)) {
    // Check number of terminals
    if (IsObjectBlock(objectType) || IsNotSet(objectType)) {
      if (terminals.length < 2)
        messages.push(TextResources.TypeEditor_Error_Terminals);
    }

    // Check type of terminals
    if (IsObjectBlock(objectType)) {
      // TO DO: Some validation here
      if (!terminals)
        messages.push(TextResources.TypeEditor_Error_TerminalsType);
    }
    // Check interface terminal type
    if (IsInterface(objectType) || IsTransport(objectType)) {
      if (
        (ModeNew(mode) && state.createLibraryType.terminalTypeId === null) ||
        (ModeEdit(mode) && state.selectedNode.terminalTypeId === null)
      )
        messages.push(TextResources.TypeEditor_Error_Terminals_Interface);
    }
  }

  return messages as string[];
};

export default GetValidationMessage;
