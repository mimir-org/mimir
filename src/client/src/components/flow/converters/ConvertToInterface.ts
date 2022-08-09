import { Connector, ConnectorDirection, Interface, Terminal } from "@mimirorg/modelbuilder-types";
import { TextResources } from "../../../assets/text/TextResources";
import { GetDateNowUtc } from "../../../helpers";
import { CreateId } from "../helpers";
import { IsBidirectionalTerminal } from "../helpers/Connectors";
import { UpdateAttributesId } from "./ConvertToTransport";

/**
 * Component to convert a Terminal to the Interface data type.
 * This conversion is needed when a transport Edge is created between two Nodes.
 * @param sourceConn
 * @returns an Interface.
 */
const ConvertToInterface = (sourceConn: Terminal, targetConn: Connector) => {
  // const inputTerminal = JSON.parse(JSON.stringify(sourceConn)) as Terminal;
  // const outputTerminal = JSON.parse(JSON.stringify(sourceConn)) as Terminal;

  const inputTerminal = JSON.parse(JSON.stringify(sourceConn)) as Terminal;
  const outputTerminal = JSON.parse(JSON.stringify(targetConn)) as Terminal;

  inputTerminal.id = CreateId();
  inputTerminal.type = IsBidirectionalTerminal(sourceConn) ? ConnectorDirection.Bidirectional : ConnectorDirection.Input;
  inputTerminal.nodeId = null;

  outputTerminal.id = CreateId();
  outputTerminal.type = IsBidirectionalTerminal(targetConn) ? ConnectorDirection.Bidirectional : ConnectorDirection.Output;
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
    attributes: sourceConn.attributes, // TODO: Check this
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
