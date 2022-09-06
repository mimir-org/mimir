import { Terminal, ConnectorDirection, Transport } from "@mimirorg/modelbuilder-types";
import { TextResources } from "../../../assets/text/TextResources";
import { LibraryState } from "../../../redux/store/library/types";
import { CreateId } from "../helpers";
import { IsBidirectionalTerminal } from "../helpers/Connectors";
import { ConvertAttributeLibCmToAttribute } from "./ConvertAttributeLibCmToAttribute";
import { ConvertTypeReference } from "./ConvertTypeReference";

/**
 * Component to convert a Terminal to the Transport data type.
 * This conversion is needed when a transport Edge is created between two Nodes.
 * @param sourceTerminal
 * @param targetTerminal
 * @param library
 * @param nodeId
 * @param nodeIri
 * @returns a Transport.
 */
const ConvertTerminalToTransport = (
  sourceTerminal: Terminal,
  targetTerminal: Terminal,
  library: LibraryState,
  nodeId: string,
  nodeIri: string
) => {
  const transportType = library?.transportTypes.find((t) => t.terminalId === sourceTerminal.terminalTypeId);
  if (transportType == undefined) return null;

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

  return {
    id: CreateId(),
    name: sourceTerminal.name,
    label: sourceTerminal.name,
    description: null,
    typeReferences: ConvertTypeReference(transportType.typeReferences),
    inputTerminalId: inputTerminal.id,
    inputTerminal,
    outputTerminalId: outputTerminal.id,
    outputTerminal,
    attributes: ConvertAttributeLibCmToAttribute(transportType.attributes, nodeId, nodeIri),
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

export function UpdateAttributesId(terminal: Terminal) {
  if (!terminal?.attributes.length) return;

  terminal.attributes.forEach((a) => {
    a.id = CreateId();
    a.terminalId = terminal.id;
  });
}

export default ConvertTerminalToTransport;
