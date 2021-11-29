import { Connector, ConnectorType, Transport } from "../../../models";
import { LibraryState } from "../../../redux/store/library/types";
import { CreateId } from "../helpers";

const ConvertToTransport = (sourceConn: Connector, library: LibraryState) => {
  const currentTransport = library?.transportTypes.find((x) => x.terminalTypeId === sourceConn.terminalTypeId);
  const transportId = CreateId();

  console.log(currentTransport);

  if (currentTransport) {
    if (currentTransport.attributes) {
      currentTransport.attributes.forEach((x) => {
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
      version: currentTransport.version,
      rds: currentTransport.rds,
      name: currentTransport.name,
      label: currentTransport.label ?? currentTransport.name,
      description: currentTransport.description,
      statusId: currentTransport.statusId,
      semanticReference: currentTransport.semanticReference,
      inputTerminalId: inputTerminal.id,
      inputTerminal: inputTerminal,
      outputTerminalId: outputTerminal.id,
      outputTerminal: outputTerminal,
      attributes: currentTransport.attributes,
      updatedBy: currentTransport.updatedBy,
      updated: currentTransport.updated,
      createdBy: currentTransport.createdBy,
      created: currentTransport.created,
      libraryTypeId: currentTransport.libraryTypeId,
    } as Transport;
  }

  return null;
};

export default ConvertToTransport;
