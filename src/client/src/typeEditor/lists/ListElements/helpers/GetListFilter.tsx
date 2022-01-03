import { ListType } from "../../../TypeEditorList";
import { Rds, AttributeType, SimpleType, PredefinedAttribute, TerminalTypeDict } from "../../../../models";
import {
  IsRds,
  IsTerminal,
  IsObjectAttributes,
  IsLocationAttributes,
  IsSimpleTypes,
  IsPredefinedAttributes,
} from "../../../helpers";

const GetListFilter = (
  searchString: string,
  listType: ListType,
  list: Rds[] | TerminalTypeDict | AttributeType[] | SimpleType[] | PredefinedAttribute[]
): Rds[] | TerminalTypeDict | AttributeType[] | SimpleType[] | PredefinedAttribute[] => {
  let filter: any[] = list;
  if (list)
    if (IsRds(listType))
      return filter.filter((x) => x.name.match(new RegExp(searchString, "i")) || x.code.match(new RegExp(searchString, "i")));
  if (IsTerminal(listType))
    return filter.filter(
      (x) => x.key.match(new RegExp(searchString, "i")) || x.value.some((y) => y.name.match(new RegExp(searchString, "i")))
    );
  if (IsObjectAttributes(listType) || IsLocationAttributes(listType))
    return filter.filter((x) => x.description.match(new RegExp(searchString, "i")));
  if (IsSimpleTypes(listType)) return filter.filter((x) => x.name.match(new RegExp(searchString, "i")));
  if (IsPredefinedAttributes(listType))
    return filter.filter(
      (x) =>
        x.key.match(new RegExp(searchString, "i")) ||
        Object.keys(x.values).some((y) => y.toLowerCase().includes(searchString.toLowerCase()))
    );
};

export default GetListFilter;
