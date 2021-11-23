import { CreateLibraryType } from "../../models";
import { IsProduct } from "../helpers";

export function IsCompositeTypesSelectionInvalid(createLibraryType: CreateLibraryType): boolean {
  return IsProduct(createLibraryType.aspect) && createLibraryType.compositeTypes.length === 0;
}

export default IsCompositeTypesSelectionInvalid;