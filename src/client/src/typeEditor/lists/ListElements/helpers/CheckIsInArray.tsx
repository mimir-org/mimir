import { Rds, AttributeType } from "../../../../models";
import { IsObjectAttributes, IsRds } from "../../../helpers";
import { ListType } from "../../../TypeEditorList";

const CheckIsInArray = (searchString: string, listType: ListType, list: Rds[] | AttributeType[]): Rds | AttributeType => {
  let filter: any[] = list;
  if (IsRds(listType)) return filter.find((x) => x.name === searchString || x.code === searchString);
  if (IsObjectAttributes(listType)) return filter.find((x) => x.description === searchString);
};

export default CheckIsInArray;
