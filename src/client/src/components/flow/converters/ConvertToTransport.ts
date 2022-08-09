import { ConnectorDirection, Terminal, Transport } from "@mimirorg/modelbuilder-types";
import { TextResources } from "../../../assets/text/TextResources";
import { GetDateNowUtc } from "../../../helpers";
import { LibraryState } from "../../../redux/store/library/types";
import { CreateId } from "../helpers";
import { IsBidirectionalTerminal } from "../helpers/Connectors";

/**
 * Component to convert a Terminal to the Transport data type.
 * This conversion is needed when a transport Edge is created between two Nodes.
 * @param sourceTerminal
 * @param targetTerminal
 * @param library
 * @returns a Transport.
 */
const ConvertToTransport = (sourceTerminal: Terminal, targetTerminal: Terminal, library: LibraryState) => {
  const transportType = library?.transportTypes.find((t) => t.terminalId === sourceTerminal.terminalTypeId);
  if (transportType == undefined) return null;

  const transportId = CreateId();
  const inputTerminal = JSON.parse(JSON.stringify(sourceTerminal)) as Terminal;
  const outputTerminal = JSON.parse(JSON.stringify(targetTerminal)) as Terminal;

  inputTerminal.id = CreateId();
  inputTerminal.type = IsBidirectionalTerminal(sourceTerminal) ? ConnectorDirection.Bidirectional : ConnectorDirection.Input;
  inputTerminal.nodeId = null;

  outputTerminal.id = CreateId();
  outputTerminal.type = IsBidirectionalTerminal(targetTerminal) ? ConnectorDirection.Bidirectional : ConnectorDirection.Output;
  outputTerminal.nodeId = null;

  const now = GetDateNowUtc();

  UpdateAttributesId(inputTerminal);
  UpdateAttributesId(outputTerminal);

  return {
    id: transportId,
    name: sourceTerminal.name,
    label: sourceTerminal.name,
    description: null,
    semanticReference: null,
    inputTerminalId: inputTerminal.id,
    inputTerminal,
    outputTerminalId: outputTerminal.id,
    outputTerminal,
    attributes: sourceTerminal.attributes, // TODO: fix conversion of attributes
    updatedBy: "",
    updated: now,
    createdBy: "",
    created: now,
    libraryTypeId: "",
    kind: TextResources.KIND_TRANSPORT,
  } as Transport;
};

export function UpdateAttributesId(terminal: Terminal) {
  if (!terminal?.attributes.length) return;

  terminal.attributes.forEach((a) => {
    a.id = CreateId();
    a.terminalId = terminal.id;
  });
}

export default ConvertToTransport;
