import { Connector, ConnectorType, Transport } from "../../../models";
import { LibraryState } from "../../../redux/store/library/types";
import { CreateId } from "../helpers/common";

const ConvertToTransport = (sourceConn: Connector, library: LibraryState) => {
  const currentTransport = library?.transportTypes.find(
    (x) => x.terminalTypeId === sourceConn.terminalTypeId
  );

  const transportId = CreateId();

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
      name: currentTransport.name,
      semanticReference: currentTransport.semanticReference,
      inputTerminalId: inputTerminal.id,
      inputTerminal: inputTerminal,
      outputTerminalId: outputTerminal.id,
      outputTerminal: outputTerminal,
      attributes: currentTransport.attributes,
    } as Transport;
  }

  return null;
};

export default ConvertToTransport;
