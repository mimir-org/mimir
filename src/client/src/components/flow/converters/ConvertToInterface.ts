import { Connector, Interface, ConnectorType } from "../../../models";
import { LibraryState } from "../../../redux/store/library/types";
import { CreateId } from "../helpers";

const ConvertToInterface = (sourceConn: Connector, library: LibraryState) => {
  const currentInterface = library?.interfaceTypes.find((x) => x.terminalTypeId === sourceConn.terminalTypeId);

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
      version: currentInterface.version,
      rds: currentInterface.rds,
      name: currentInterface.name,
      label: currentInterface.label ?? currentInterface.name,
      description: currentInterface.description,
      statusId: currentInterface.statusId,
      semanticReference: currentInterface.semanticReference,
      attributes: currentInterface.attributes,
      inputTerminalId: inputTerminal.id,
      inputTerminal: inputTerminal,
      outputTerminalId: outputTerminal.id,
      outputTerminal: outputTerminal,
      updatedBy: currentInterface.updatedBy,
      updated: currentInterface.updated,
      createdBy: currentInterface.createdBy,
      created: currentInterface.created,
      libraryTypeId: currentInterface.libraryTypeId,
    } as Interface;
  }
  return null;
};

export default ConvertToInterface;
