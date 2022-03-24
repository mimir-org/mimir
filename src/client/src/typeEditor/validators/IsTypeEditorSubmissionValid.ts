import { CreateLibraryType } from "../../models";
import {
  IsAspectSelectionInvalid,
  IsAttributeTypesSelectionInvalid,
  IsLocationSelectionInvalid,
  IsObjectSelectionInvalid,
  IsPredefinedAttributesSelectionInvalid,
  IsPurposeSelectionInvalid,
  IsRdsSelectionInvalid,
  IsSymbolSelectionInvalid,
  IsTerminalTypesSelectionInvalid,
  IsTerminalMediaTypesInvalid,
  IsTypeNameInvalid,
} from "../validators";

export function IsTypeEditorSubmissionValid(createLibraryType: CreateLibraryType): boolean {
  return [
    IsAspectSelectionInvalid,
    IsObjectSelectionInvalid,
    IsPurposeSelectionInvalid,
    IsLocationSelectionInvalid,
    IsSymbolSelectionInvalid,
    IsTypeNameInvalid,
    IsRdsSelectionInvalid,
    IsTerminalTypesSelectionInvalid,
    IsTerminalMediaTypesInvalid,
    IsAttributeTypesSelectionInvalid,
    IsPredefinedAttributesSelectionInvalid,
  ].every((func) => func(createLibraryType) === false);
}

export default IsTypeEditorSubmissionValid;
