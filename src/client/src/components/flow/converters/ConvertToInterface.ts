import { Connector, ConnectorDirection, Interface, Terminal } from "@mimirorg/modelbuilder-types";
import { TextResources } from "../../../assets/text/TextResources";
import { GetDateNowUtc } from "../../../helpers";
import { LibraryState } from "../../../redux/store/library/types";
import { CreateId } from "../helpers";
import { IsBidirectionalTerminal } from "../helpers/Connectors";
import { UpdateAttributesId } from "./ConvertToTransport";

/**
 * Component to convert a Terminal to the Interface data type.
 * This conversion is needed when a transport Edge is created between two Nodes.
 * @param sourceTerminal
 * @param targetTerminal
 * @param library
 * @returns an Interface.
 */
const ConvertToInterface = (sourceTerminal: Terminal, targetTerminal: Connector, library: LibraryState) => {
  const interfaceType = library?.interfaceTypes.find((i) => i.terminalId === sourceTerminal.terminalTypeId); // TODO: check which id to use
  if (interfaceType == undefined) return null;

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

  const now = GetDateNowUtc();

  return {
    id: CreateId(),
    iri: "",
    version: "",
    rds: "",
    name: "",
    label: "",
    description: "",
    statusId: "",
    semanticReference: "",
    attributes: sourceTerminal.attributes, // TODO: Check this
    inputTerminalId: inputTerminal.id,
    inputTerminal: inputTerminal,
    outputTerminalId: outputTerminal.id,
    outputTerminal: outputTerminal,
    updatedBy: "",
    updated: now,
    createdBy: "",
    created: now,
    libraryTypeId: "",
    kind: TextResources.KIND_INTERFACE,
  } as Interface;
};

export default ConvertToInterface;
