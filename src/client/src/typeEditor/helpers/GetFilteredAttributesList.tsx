import { Aspect } from "../../models";

const GetFilteredAttributesList = (attributes: any[], aspect: Aspect): any[] => {
  if (!attributes || attributes.length <= 0) return [] as any[];
  const filteredList = attributes.filter((x) => aspect & x.aspect);
  return filteredList;
};

export default GetFilteredAttributesList;
