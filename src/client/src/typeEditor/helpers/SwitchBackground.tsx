import { ListType } from "../TypeEditorList";

const SwitchBackground = (listType: ListType): boolean => {
  return listType === ListType.Rds;
};
export default SwitchBackground;
