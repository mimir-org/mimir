/* eslint-disable @typescript-eslint/no-unused-vars */
import { Attribute, Connector, ConnectorDirection, Transport } from "@mimirorg/modelbuilder-types";
import { LibraryState } from "../../../redux/store/library/types";
import { CreateId } from "../helpers";
import { IsBidirectionalTerminal } from "../helpers/Connectors";

const ConvertToTransport = (sourceConn: Connector, library: LibraryState) => {
  const transportType = null; //library?.transportTypes.find((x) => x.terminalTypeId === sourceConn.terminalTypeId);
  if (!transportType) return null;

  const transportId = CreateId();
  const attributes: Attribute[] = transportType?.attributes.map((a) => ({ ...a, transportId, id: CreateId() })) ?? [];

  const inputTerminal = JSON.parse(JSON.stringify(sourceConn)) as Connector;
  const outputTerminal = JSON.parse(JSON.stringify(sourceConn)) as Connector;

  inputTerminal.id = CreateId();
  inputTerminal.type = IsBidirectionalTerminal(sourceConn) ? ConnectorDirection.Bidirectional : ConnectorDirection.Input;
  inputTerminal.nodeId = null;

  outputTerminal.id = CreateId();
  outputTerminal.type = IsBidirectionalTerminal(sourceConn) ? ConnectorDirection.Bidirectional : ConnectorDirection.Output;
  outputTerminal.nodeId = null;

  // if (inputTerminal?.attributes) {
  //   inputTerminal.attributes.forEach((x) => {
  //     x.id = CreateId();
  //     x.terminalId = inputTerminal.id;
  //   });
  // }

  // if (outputTerminal?.attributes) {
  //   outputTerminal.attributes.forEach((x) => {
  //     x.id = CreateId();
  //     x.terminalId = outputTerminal.id;
  //   });
  // }

  return {
    id: transportId,
    iri: "",
    version: transportType.version,
    rds: transportType.rdsId,
    name: transportType.name,
    label: transportType.name,
    description: transportType.description,
    statusId: transportType.statusId,
    semanticReference: transportType.semanticReference,
    inputTerminalId: inputTerminal.id,
    inputTerminal: inputTerminal,
    outputTerminalId: outputTerminal.id,
    outputTerminal: outputTerminal,
    attributes: attributes,
    updatedBy: transportType.updatedBy,
    updated: transportType.updated,
    createdBy: transportType.createdBy,
    created: transportType.created,
    libraryTypeId: transportType.id,
    kind: transportType.kind,
  } as Transport;
};

export default ConvertToTransport;
