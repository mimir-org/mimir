/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateLibraryType, Aspect, ObjectType, Rds } from "../../models";

const GetRDSList = (createLibraryType: CreateLibraryType, items: Rds[]): any[] => {
  if (
    createLibraryType.aspect !== Aspect.NotSet &&
    createLibraryType.objectType !== ObjectType.NotSet &&
    createLibraryType.purpose !== "" &&
    createLibraryType.name !== "" &&
    createLibraryType.symbolId !== ""
  )
    return items;
  else return [];
};

export default GetRDSList;
