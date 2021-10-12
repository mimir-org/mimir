import { ListType } from "../TypeEditorList";

const RemoveHover = (listType: ListType): boolean => {
  return listType === ListType.Rds;
};
export default RemoveHover;
