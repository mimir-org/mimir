import { Connector, ConnectorType, Interface, INTERFACE_KIND } from "../../../models";
import { LibraryState } from "../../../redux/store/library/types";
import { CreateId } from "../helpers";
import { IsBidirectionalTerminal } from "../helpers/Connectors";

const ConvertToInterface = (sourceConn: Connector, library: LibraryState) => {
  const interfaceType = library?.interfaceTypes.find((x) => x.terminalTypeId === sourceConn.terminalTypeId);
  if (!interfaceType) return null;

  const inputTerminal = JSON.parse(JSON.stringify(sourceConn)) as Connector;
  const outputTerminal = JSON.parse(JSON.stringify(sourceConn)) as Connector;

  inputTerminal.id = CreateId();
  inputTerminal.type = IsBidirectionalTerminal(sourceConn) ? ConnectorType.Bidirectional : ConnectorType.Input;
  inputTerminal.nodeId = null;

  outputTerminal.id = CreateId();
  outputTerminal.type = IsBidirectionalTerminal(sourceConn) ? ConnectorType.Bidirectional : ConnectorType.Output;
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
    kind: INTERFACE_KIND,
  } as Interface;
};

export default ConvertToInterface;
