import { ListType } from "../../../TypeEditorList";
import { Rds, TerminalType, AttributeType, CompositeType, PredefinedAttribute } from "../../../../models";
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
  list: Rds[] | TerminalType[] | AttributeType[] | CompositeType[] | PredefinedAttribute[]
): Rds[] | TerminalType[] | AttributeType[] | CompositeType[] | PredefinedAttribute[] => {
  let filter: any[] = list;
  if (list) {
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
          x.key.match(new RegExp(searchString, "i")) || Object.keys(x.values).some((y) => y.match(new RegExp(searchString, "i")))
      );
  }
};

export default GetListFilter;
