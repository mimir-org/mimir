import { Interface, Terminal } from "@mimirorg/modelbuilder-types";
import { LibraryState } from "../../../redux/store/library/types";
import { IsBidirectionalTerminal } from "../helpers/Connectors";
import { InterfaceLibCm } from "@mimirorg/typelibrary-types";
import ConvertInterfaceLibCmToInterface from "./ConvertInterfaceLibCmToInterface";

/**
 * Component to convert a Terminal to the Interface data type.
 * This conversion is needed when a transport Edge is created between two Nodes.
 * @param sourceTerminal
 * @param library
 * @returns a Transport.
 */
const ConvertTerminalToInterface = (sourceTerminal: Terminal, library: LibraryState): Interface => {
  const interfaceType = FindInterfaceTypeRecursive(library, sourceTerminal.terminalTypeId);
  if (interfaceType == null) return null;
  return ConvertInterfaceLibCmToInterface(interfaceType, IsBidirectionalTerminal(sourceTerminal), library.terminals);
};

export const FindInterfaceTypeRecursive = (library: LibraryState, terminalTypeId: string): InterfaceLibCm => {
  const interfaceType = library?.interfaceTypes?.find((t) => t.terminalId === terminalTypeId);

  if (interfaceType != null) return interfaceType;

  const terminalType = library?.terminals?.find((t) => t.id === terminalTypeId);
  if (terminalType == null && terminalType.parentId == null) return null;

  const parentTerminalType = library?.terminals.find((t) => t.id === terminalType.parentId);
  if (parentTerminalType == null) return null;

  return FindInterfaceTypeRecursive(library, parentTerminalType.id);
};

export default ConvertTerminalToInterface;
