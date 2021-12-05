import { Connector, ConnectorType, Transport } from "../../../models";
import { LibraryState } from "../../../redux/store/library/types";
import { CreateId } from "../helpers";

const ConvertToTransport = (sourceConn: Connector, library: LibraryState) => {
  const transportType = library?.transportTypes.find((x) => x.terminalTypeId === sourceConn.terminalTypeId);
  const transportId = CreateId();

  if (transportType) {
    if (transportType.attributes) {
      transportType.attributes.forEach((x) => {
        x.id = CreateId();
        x.transportId = transportId;
      });
    }

    const inputTerminal = JSON.parse(JSON.stringify(sourceConn)) as Connector;
    const outputTerminal = JSON.parse(JSON.stringify(sourceConn)) as Connector;

    inputTerminal.id = CreateId();
    inputTerminal.type = ConnectorType.Input;
    inputTerminal.nodeId = null;
    outputTerminal.id = CreateId();
    outputTerminal.type = ConnectorType.Output;
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
      id: transportId,
      version: transportType.version,
      rds: transportType.rds,
      name: transportType.name,
      label: transportType.label ?? transportType.name,
      description: transportType.description,
      statusId: transportType.statusId,
      semanticReference: transportType.semanticReference,
      inputTerminalId: inputTerminal.id,
      inputTerminal: inputTerminal,
      outputTerminalId: outputTerminal.id,
      outputTerminal: outputTerminal,
      attributes: transportType.attributes,
      updatedBy: transportType.updatedBy,
      updated: transportType.updated,
      createdBy: transportType.createdBy,
      created: transportType.created,
      libraryTypeId: transportType.id,
    } as Transport;
  }

  return null;
};

export default ConvertToTransport;
