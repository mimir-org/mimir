import { Connector, ConnectorDirection, Interface, Terminal } from "@mimirorg/modelbuilder-types";
import { TextResources } from "../../../assets/text/TextResources";
import { LibraryState } from "../../../redux/store/library/types";
import { CreateId } from "../helpers";
import { IsBidirectionalTerminal } from "../helpers/Connectors";
import { ConvertAttributeLibCmToAttribute } from "./ConvertAttributeLibCmToAttribute";
import { UpdateAttributesId } from "./ConvertTerminalToTransport";

/**
 * Component to convert a Terminal to the Interface data type.
 * This conversion is needed when a transport Edge is created between two Nodes.
 * @param sourceTerminal
 * @param targetTerminal
 * @param library
 * @param nodeId
 * @param nodeIri
 * @returns an Interface.
 */
const ConvertTerminalToInterface = (
  sourceTerminal: Terminal,
  targetTerminal: Connector,
  library: LibraryState,
  nodeId: string,
  nodeIri: string
) => {
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

  return {
    id: CreateId(),
    name: sourceTerminal.name,
    label: sourceTerminal.name,
    description: null,
    semanticReference: null,
    attributes: ConvertAttributeLibCmToAttribute(interfaceType.attributes, nodeId, nodeIri),
    inputTerminalId: inputTerminal.id,
    inputTerminal: inputTerminal,
    outputTerminalId: outputTerminal.id,
    outputTerminal: outputTerminal,
    updatedBy: null,
    updated: null,
    createdBy: interfaceType.createdBy,
    created: interfaceType.created,
    libraryTypeId: interfaceType.id,
    kind: TextResources.KIND_INTERFACE,
  } as Interface;
};

export default ConvertTerminalToInterface;
