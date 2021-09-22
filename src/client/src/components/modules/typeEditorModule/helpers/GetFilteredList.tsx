import {
  GetFilteredRdsList,
  GetFilteredTerminalsList,
  GetFilteredAttributesList,
} from ".";
import { CreateLibraryType } from "../../../../models";
import { ListType } from "../TypeEditorList";

const GetFilteredList = (
  listType: ListType,
  items: any,
  createLibraryType: CreateLibraryType
): any[] => {
  switch (listType) {
    case ListType.Rds:
      return GetFilteredRdsList(items, createLibraryType.aspect);
    case ListType.Terminals:
      return GetFilteredTerminalsList(items);
    case ListType.PredefinedAttributes:
      return items;
    case ListType.ObjectAttributes:
      return GetFilteredAttributesList(items, createLibraryType.aspect);
    case ListType.LocationAttributes:
      return GetFilteredAttributesList(items, createLibraryType.aspect);
    case ListType.CompositeTypes:
      return [];
    default:
      return [] as any[];
  }
};

export default GetFilteredList;
