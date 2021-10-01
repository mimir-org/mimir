import { Connector, Interface, ConnectorType } from "../../../models";
import { LibraryState } from "../../../redux/store/library/types";
import { CreateId } from "../helpers/common";

const ConvertToInterface = (sourceConn: Connector, library: LibraryState) => {
  const currentInterface = library?.interfaceTypes.find(
    (x) => x.terminalTypeId === sourceConn.terminalTypeId
  );

  if (currentInterface) {
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
      id: CreateId(),
      name: currentInterface.name,
      semanticReference: currentInterface.semanticReference,
      inputTerminalId: inputTerminal.id,
      inputTerminal: inputTerminal,
      outputTerminalId: outputTerminal.id,
      outputTerminal: outputTerminal,
    } as Interface;
  }
  return null;
};

export default ConvertToInterface;
