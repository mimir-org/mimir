import { TerminalTypeDict, TerminalTypeExtended, TerminalTypeItem } from "../../models";

export const GetFilteredTerminalTypeExtendedList = (
  terminalTypeDict: TerminalTypeDict,
  terminalTypeItems: TerminalTypeItem[]
): TerminalTypeExtended[] => {
  const terminals: TerminalTypeExtended[] = [];
  const terminalTypes = terminalTypeDict.map((obj) => obj.value).flat();

  for (const terminalTypeItem of terminalTypeItems) {
    const terminalType = terminalTypes.find((term) => terminalTypeItem.terminalTypeId === term.id);

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
