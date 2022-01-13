import { ConnectorType, CreateLibraryType, TerminalType } from "../../../models";

const GetInputTerminals = (createLibraryType: CreateLibraryType, terminals: any[]): TerminalType[] => {
  const terminalsArray: TerminalType[] = [];
  createLibraryType?.terminalTypes
    .filter((t) => t.connectorType === ConnectorType.Input)
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

export default GetInputTerminals;
