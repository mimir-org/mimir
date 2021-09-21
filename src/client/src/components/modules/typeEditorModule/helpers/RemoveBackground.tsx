import { ListType } from "../TypeEditorList";

const RemoveBackground = (listType: ListType): boolean => {
  if (
    listType === ListType.Terminals ||
    listType === ListType.PredefinedAttributes
  ) {
    return false;
  } else {
    return true;
  }
};
export default RemoveBackground;
