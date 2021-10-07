import { ListType } from "../TypeEditorList";
import { CreateLibraryType } from "../../../../models";
import { IsFunction, IsProduct, IsObjectBlock } from ".";

const ShowObjectBlock = (listType: ListType, createLibraryType: CreateLibraryType): boolean => {
  return (
    listType === ListType.Terminals &&
    ((IsFunction(createLibraryType?.aspect) && IsObjectBlock(createLibraryType?.objectType)) ||
      (IsProduct(createLibraryType?.aspect) && IsObjectBlock(createLibraryType?.objectType)))
  );
};
export default ShowObjectBlock;
