import { Terminal, Transport } from "@mimirorg/modelbuilder-types";
import { TransportLibCm } from "@mimirorg/typelibrary-types";
import { LibraryState } from "../../../redux/store/library/types";
import { IsBidirectionalTerminal } from "../helpers/Connectors";
import ConvertTransportLibCmToTransport from "./ConvertTransportLibCmToTransport";

/**
 * Component to convert a Terminal to the Transport data type.
 * This conversion is needed when a transport Edge is created between two Nodes.
 * @param sourceTerminal
 * @param library
 * @returns a Transport.
 */
const ConvertTerminalToTransport = (sourceTerminal: Terminal, library: LibraryState): Transport => {
  const transportType = FindTransportTypeRecursive(library, sourceTerminal.terminalTypeId);
  if (transportType == null) return null;
  return ConvertTransportLibCmToTransport(transportType, IsBidirectionalTerminal(sourceTerminal), library.terminals);
};

export const FindTransportTypeRecursive = (library: LibraryState, terminalTypeId: string): TransportLibCm => {
  const transportType = library?.transportTypes?.find((t) => t.terminalId === terminalTypeId);

  if (transportType != null) return transportType;

  const terminalType = library?.terminals?.find((t) => t.id === terminalTypeId);
  if (terminalType == null && terminalType.parentId == null) return null;

  const parentTerminalType = library?.terminals.find((t) => t.id === terminalType.parentId);
  if (parentTerminalType == null) return null;

  return FindTransportTypeRecursive(library, parentTerminalType.id);
};

export default ConvertTerminalToTransport;
