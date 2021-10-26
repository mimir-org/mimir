import { Rds, AttributeType } from "../../../../models";
import { IsObjectAttributes, IsRds } from "../../../helpers";
import { ListType } from "../../../TypeEditorList";

const GetListFilter = (searchString: string, listType: ListType, list: Rds[] | AttributeType[]): Rds[] | AttributeType[] => {
  let filter: any[] = list;
  if (IsRds(listType))
    return filter.filter((x) => x.name.match(new RegExp(searchString, "i")) || x.code.match(new RegExp(searchString, "i")));
  if (IsObjectAttributes(listType)) return filter.filter((x) => x.description.match(new RegExp(searchString, "i")));
};

export default GetListFilter;
