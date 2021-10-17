import { ListType } from "../TypeEditorList";

const SwitchBackground = (listType: ListType): boolean => {
  return listType === ListType.Rds || listType === ListType.ObjectAttributes || listType === ListType.LocationAttributes;
};
export default SwitchBackground;
