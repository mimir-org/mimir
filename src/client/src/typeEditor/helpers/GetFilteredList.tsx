import { CreateLibraryType, Discipline } from "../../models";
import { ListType } from "../TypeEditorList";
import { GetFilteredRdsList, GetFilteredTerminalsList, GetFilteredAttributesList } from ".";

const GetFilteredList = (
  listType: ListType,
  items: any,
  createLibraryType: CreateLibraryType,
  discipline?: Discipline
): any[] => {
  const aspect = createLibraryType?.aspect;
  switch (listType) {
    case ListType.Rds:
      return GetFilteredRdsList(items, aspect);
    case ListType.Terminals:
      return GetFilteredTerminalsList(items);
    case ListType.PredefinedAttributes:
      return items;
    case ListType.ObjectAttributes:
      return GetFilteredAttributesList(items, aspect, discipline);
    case ListType.LocationAttributes:
      return GetFilteredAttributesList(items, aspect, discipline);
    case ListType.SimpleTypes:
      return items;
    default:
      return [] as any[];
  }
};

export default GetFilteredList;
