import { Connector, ConnectorDirection, Interface, Terminal } from "@mimirorg/modelbuilder-types";
import { LibraryState } from "../../../redux/store/library/types";
import { CreateId } from "../helpers";
import { IsBidirectionalTerminal } from "../helpers/Connectors";

const ConvertToInterface = (sourceConn: Connector, library: LibraryState) => {
  const interfaceType = null; // library?.interfaceTypes.find((x) => x.terminalTypeId === sourceConn.terminalTypeId);
  if (!interfaceType) return null;

  const inputTerminal = JSON.parse(JSON.stringify(sourceConn)) as Terminal;
  const outputTerminal = JSON.parse(JSON.stringify(sourceConn)) as Terminal;

  inputTerminal.id = CreateId();
  inputTerminal.type = IsBidirectionalTerminal(sourceConn) ? ConnectorDirection.Bidirectional : ConnectorDirection.Input;
  inputTerminal.nodeId = null;

  outputTerminal.id = CreateId();
  outputTerminal.type = IsBidirectionalTerminal(sourceConn) ? ConnectorDirection.Bidirectional : ConnectorDirection.Output;
  outputTerminal.nodeId = null;

  if (inputTerminal?.attributes) {
    inputTerminal.attributes.forEach((x) => {
      x.id = CreateId();
      x.terminalId = inputTerminal.id;
    });
  }

  if (outputTerminal?.attributes) {
    outputTerminal.attributes.forEach((x) => {
      x.id = CreateId();
      x.terminalId = outputTerminal.id;
    });
  }

  return {
    id: CreateId(),
    iri: "",
    version: interfaceType.version,
    rds: interfaceType.rdsId,
    name: interfaceType.name,
    label: interfaceType.name,
    description: interfaceType.description,
    statusId: interfaceType.statusId,
    semanticReference: interfaceType.semanticReference,
    attributes: interfaceType.attributes,
    inputTerminalId: inputTerminal.id,
    inputTerminal: inputTerminal,
    outputTerminalId: outputTerminal.id,
    outputTerminal: outputTerminal,
    updatedBy: interfaceType.updatedBy,
    updated: interfaceType.updated,
    createdBy: interfaceType.createdBy,
    created: interfaceType.created,
    libraryTypeId: interfaceType.id,
    kind: interfaceType.kind,
  } as Interface;
};

export default ConvertToInterface;
