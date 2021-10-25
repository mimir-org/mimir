import { ConnectorType, CreateLibraryType, TerminalType } from "../../../models";

const GetOutputTerminals = (createLibraryType: CreateLibraryType, terminals: any[]): TerminalType[] => {
  let terminalsArray: TerminalType[] = [];
  createLibraryType?.terminalTypes
    .filter((t) => ConnectorType[t.type] === ConnectorType[ConnectorType.Output])
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
