import { CreateLibraryType } from "../../models";
import {
  IsAspectSelectionInvalid,
  IsLocationSelectionInvalid,
  IsObjectSelectionInvalid,
  IsPurposeSelectionInvalid,
  IsSymbolSelectionInvalid,
  IsTypeNameInvalid,
  IsRdsSelectionInvalid,
  IsTerminalTypesSelectionInvalid,
  IsAttributeTypesSelectionInvalid,
  IsPredefinedAttributesSelectionInvalid,
  IsCompositeTypesSelectionInvalid
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
    IsAttributeTypesSelectionInvalid,
    IsPredefinedAttributesSelectionInvalid,
    IsCompositeTypesSelectionInvalid
  ].every(func => func(createLibraryType) === false)
}

export default IsTypeEditorSubmissionValid;