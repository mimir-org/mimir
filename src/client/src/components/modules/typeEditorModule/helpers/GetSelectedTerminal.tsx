import { CreateLibraryType, TerminalType } from "../../../../models";

const GetSelectedTerminal = (
  createLibraryType: CreateLibraryType,
  terminals: any[]
): TerminalType => {
  let selectedTerminal: TerminalType;
  terminals.forEach((t) => {
    t.value.forEach((element) => {
      if (element.id === createLibraryType?.terminalTypeId) {
        selectedTerminal = element;
      }
    });
  });
  return selectedTerminal;
};

export default GetSelectedTerminal;
