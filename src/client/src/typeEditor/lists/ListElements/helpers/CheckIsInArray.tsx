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

const CheckIsInArray = (
  searchString: string,
  listType: ListType,
  list: Rds[] | TerminalType[] | AttributeType[] | CompositeType[] | PredefinedAttribute[]
): Rds | TerminalType | AttributeType | CompositeType | PredefinedAttribute => {
  let filter: any[] = list;
  if (list) {
    if (IsRds(listType)) return filter.find((x) => x.name === searchString || x.code === searchString);
    if (IsTerminal(listType)) return filter.find((x) => x.key === searchString || x.value.some((y) => y.name === searchString));
    if (IsObjectAttributes(listType) || IsLocationAttributes(listType)) return filter.find((x) => x.description === searchString);
    if (IsSimpleTypes(listType)) return filter.find((x) => x.name === searchString);
    if (IsPredefinedAttributes(listType))
      return filter.find((x) => x.key === searchString || Object.keys(x.values).some((y) => y === searchString));
  }
};

export default CheckIsInArray;
