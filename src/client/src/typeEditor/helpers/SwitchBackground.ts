import { ListType } from "../TypeEditorList";

const SwitchBackground = (listType: ListType): boolean => {
  return listType === ListType.ObjectAttributes;
};
export default SwitchBackground;
