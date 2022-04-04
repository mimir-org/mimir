import { CreateLibraryType } from "../../models";
import { IsLocation } from "../helpers";

export function IsTerminalTypesSelectionInvalid(createLibraryType: CreateLibraryType): boolean {
  const hasNoTerminals = createLibraryType.terminalTypes.length === 0;
  const hasTerminalsWithoutTypeId = createLibraryType.terminalTypes.some((t) => t.terminalTypeId === "");
  const hasSingleTerminalIdWithoutTypes = createLibraryType.terminalTypeId !== "" && hasNoTerminals;

  return (
    !IsLocation(createLibraryType.aspect) && (hasNoTerminals || hasTerminalsWithoutTypeId || hasSingleTerminalIdWithoutTypes)
  );
}

export default IsTerminalTypesSelectionInvalid;
