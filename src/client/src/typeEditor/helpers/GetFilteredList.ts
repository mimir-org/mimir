/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateLibraryType } from "../../models";
import { ListType } from "../TypeEditorList";
import { GetAttributesList, GetFilteredAttributesList, GetFilteredTerminalsList, GetRDSList } from ".";

const GetFilteredList = (listType: ListType, items: any, createLibraryType: CreateLibraryType): any[] => {
  const aspect = createLibraryType?.aspect;
  switch (listType) {
    case ListType.Rds:
      return GetRDSList(createLibraryType, items);
    case ListType.Terminals:
      return GetFilteredTerminalsList(items);
    case ListType.PredefinedAttributes:
      return items;
    case ListType.ObjectAttributes:
      return GetFilteredAttributesList(items, aspect);
    case ListType.LocationAttributes:
      return GetAttributesList(items, aspect);
    case ListType.SimpleTypes:
      return items;
    default:
      return [] as any[];
  }
};

export default GetFilteredList;
