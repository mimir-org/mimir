/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateLibraryType, Aspect, Rds } from "../../models";

const GetRDSList = (createLibraryType: CreateLibraryType, items: Rds[]): any[] => {
  if (createLibraryType.aspect !== Aspect.NotSet && createLibraryType.aspect !== Aspect.None) {
    return items;
  }

  return [];
};

export default GetRDSList;
