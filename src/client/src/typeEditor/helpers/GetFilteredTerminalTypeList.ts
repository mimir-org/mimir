import { TerminalTypeDict, TerminalTypeExtended, TerminalTypeItem } from "../../models";

export const GetFilteredTerminalTypeExtendedList = (
  terminalTypeDict: TerminalTypeDict,
  terminalTypeItems: TerminalTypeItem[]
): TerminalTypeExtended[] => {
  let terminals: TerminalTypeExtended[] = [];
  let terminalTypes = terminalTypeDict.map((obj) => obj.value).flat();

  console.log("running use memo array for terminalTypes");

  for (let terminalTypeItem of terminalTypeItems) {
    let terminalType = terminalTypes.find((term) => terminalTypeItem.terminalTypeId === term.id);

    if (!terminalType) continue;

    terminals.push({
      ...terminalType,
      number: terminalTypeItem.number,
      type: terminalTypeItem.connectorType,
      terminalTypeId: terminalType.id,
    } as TerminalTypeExtended);
  }

  return terminals;
};
