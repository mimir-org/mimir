import { ObjectType } from "../../../../../../../../../models";

export const SetNewSelectedElementType = (libraryType: ObjectType, setSelectedElementType: (value: ObjectType) => void) =>
  setSelectedElementType(libraryType);
