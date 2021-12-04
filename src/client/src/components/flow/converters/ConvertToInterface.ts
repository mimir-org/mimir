import { Connector, Interface, ConnectorType } from "../../../models";
import { LibraryState } from "../../../redux/store/library/types";
import { CreateId } from "../helpers";

const ConvertToInterface = (sourceConn: Connector, library: LibraryState) => {
  const interfaceType = library?.interfaceTypes.find((x) => x.terminalTypeId === sourceConn.terminalTypeId);

  if (interfaceType) {
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
      version: interfaceType.version,
      rds: interfaceType.rds,
      name: interfaceType.name,
      label: interfaceType.label ?? interfaceType.name,
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
    } as Interface;
  }
  return null;
};

export default ConvertToInterface;
