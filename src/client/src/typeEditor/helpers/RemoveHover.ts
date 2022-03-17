import { ListType } from "../TypeEditorList";

const RemoveHover = (listType: ListType): boolean => {
  return listType === ListType.PredefinedAttributes;
};
export default RemoveHover;
