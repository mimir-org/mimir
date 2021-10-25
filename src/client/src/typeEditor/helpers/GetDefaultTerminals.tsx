import { CreateLibraryType, TerminalTypeItem } from "../../models";

const GetDefaultTerminals = (categoryId: string, createLibraryType: CreateLibraryType): TerminalTypeItem[] => {
  return createLibraryType.terminalTypes?.filter((x) => x.terminalCategoryId === categoryId);
};
export default GetDefaultTerminals;
