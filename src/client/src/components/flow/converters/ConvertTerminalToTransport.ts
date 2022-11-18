import { Terminal, ConnectorDirection, Transport } from "@mimirorg/modelbuilder-types";
import { TransportLibCm } from "@mimirorg/typelibrary-types";
import { TextResources } from "../../../assets/text/TextResources";
import { LibraryState } from "../../../redux/store/library/types";
import { CreateId } from "../helpers";
import { IsBidirectionalTerminal } from "../helpers/Connectors";
import { ConvertTransportAttributeLibCmToAttribute } from "./ConvertAttributeLibCmToAttribute";
import { ConvertTypeReference } from "./ConvertTypeReference";

/**
 * Component to convert a Terminal to the Transport data type.
 * This conversion is needed when a transport Edge is created between two Nodes.
 * @param sourceTerminal
 * @param targetTerminal
 * @param library
 * @returns a Transport.
 */
const ConvertTerminalToTransport = (sourceTerminal: Terminal, targetTerminal: Terminal, library: LibraryState) => {
  console.log(sourceTerminal);
  const transportType = FindTransportTypeRecursive(library, sourceTerminal.terminalTypeId);
  if (transportType == null) return null;

  const inputTerminal = JSON.parse(JSON.stringify(sourceTerminal)) as Terminal;
  const outputTerminal = JSON.parse(JSON.stringify(targetTerminal)) as Terminal;

  inputTerminal.id = CreateId();
  inputTerminal.type = IsBidirectionalTerminal(sourceTerminal) ? ConnectorDirection.Bidirectional : ConnectorDirection.Input;
  inputTerminal.nodeId = null;

  outputTerminal.id = CreateId();
  outputTerminal.type = IsBidirectionalTerminal(targetTerminal) ? ConnectorDirection.Bidirectional : ConnectorDirection.Output;
  outputTerminal.nodeId = null;

  UpdateAttributesId(inputTerminal);
  UpdateAttributesId(outputTerminal);

  const id = CreateId();

  return {
    id: id,
    name: sourceTerminal.name,
    label: sourceTerminal.name,
    description: null,
    typeReferences: ConvertTypeReference(transportType.typeReferences),
    inputTerminalId: inputTerminal.id,
    inputTerminal,
    outputTerminalId: outputTerminal.id,
    outputTerminal,
    attributes: ConvertTransportAttributeLibCmToAttribute(transportType.attributes, id),
    updatedBy: null,
    updated: null,
    createdBy: transportType.createdBy,
    created: transportType.created,
    libraryTypeId: transportType.id,
    kind: TextResources.KIND_TRANSPORT,
    version: "1.0",
    rds: transportType.rdsCode,
  } as Transport;
};

export const FindTransportTypeRecursive = (library: LibraryState, terminalTypeId: string): TransportLibCm => {
  const transportType = library?.transportTypes?.find((t) => t.terminalId === terminalTypeId);
  console.log(transportType, library.transportTypes);

  if (transportType != null) return transportType;

  const terminalType = library?.terminals?.find((t) => t.id === terminalTypeId);
  if (terminalType == null && terminalType.parentId == null) return null;

  const parentTerminalType = library?.terminals.find((t) => t.name === terminalType.parentId);
  if (parentTerminalType == null) return null;

  return FindTransportTypeRecursive(library, parentTerminalType.id);
};

export function UpdateAttributesId(terminal: Terminal) {
  if (!terminal?.attributes?.length) return;

  terminal.attributes.forEach((a) => {
    a.id = CreateId();
    a.terminalId = terminal.id;
  });
}

export default ConvertTerminalToTransport;
