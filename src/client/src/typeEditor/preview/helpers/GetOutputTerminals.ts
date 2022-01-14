import { ConnectorType, CreateLibraryType, TerminalType } from "../../../models";

const GetOutputTerminals = (createLibraryType: CreateLibraryType, terminals: any[]): TerminalType[] => {
  const terminalsArray: TerminalType[] = [];
  createLibraryType?.terminalTypes
    .filter(
      (t) =>
        ConnectorType[t.connectorType] === ConnectorType[ConnectorType.Output] ||
        ConnectorType[t.connectorType] === ConnectorType[ConnectorType.Bidirectional]
    )
    .forEach((t) => {
      terminals.forEach((x) => {
        x.value.forEach((y) => {
          if (y.id === t.terminalTypeId) {
            terminalsArray.push(y);
          }
        });
      });
    });
  return terminalsArray;
};

export default GetOutputTerminals;
