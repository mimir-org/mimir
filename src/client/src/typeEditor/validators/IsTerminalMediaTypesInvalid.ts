import { CreateLibraryType } from "../../models";
import { IsLocation, IsObjectBlock } from "../helpers";

export function IsTerminalMediaTypesInvalid(createLibraryType: CreateLibraryType): boolean {
  const emptyTerminal = createLibraryType.terminalTypes.some((t) => t.terminalTypeId === "");
  return (
    !IsLocation(createLibraryType.aspect) &&
    IsObjectBlock(createLibraryType.objectType) &&
    createLibraryType.terminalTypes.length > 0 &&
    emptyTerminal
  );
}

export default IsTerminalMediaTypesInvalid;
