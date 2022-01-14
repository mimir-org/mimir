/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateLibraryType, TerminalType } from "../../models";
import { ListType } from "../TypeEditorList";
import { GetFilteredTerminalsList } from ".";

const GetDefaultTerminal = (listType: ListType, createLibraryType: CreateLibraryType, items: any[]): TerminalType => {
  let terminal;
  if (listType === ListType.Terminals && createLibraryType?.terminalTypeId) {
    GetFilteredTerminalsList(items)?.forEach((cat) => {
      cat.items.forEach((item) => {
        if (item.id === createLibraryType.terminalTypeId) {
          terminal = item;
        }
      });
    });
  }
  return terminal;
};
export default GetDefaultTerminal;
