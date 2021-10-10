import { Aspect } from "../../models";

const GetFilteredRdsList = (rds: any[], aspect: Aspect): any[] => {
  if (!rds || rds.length <= 0) return [] as any[];
  const filteredList = rds.filter((x) => aspect & x.aspect);
  return filteredList;
};

export default GetFilteredRdsList;
