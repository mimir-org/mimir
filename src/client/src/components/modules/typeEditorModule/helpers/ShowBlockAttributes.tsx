import { ListType } from "../TypeEditorList";

const ShowBlockAttributes = (listType: ListType): boolean => {
  return listType === ListType.ObjectAttributes || listType === ListType.LocationAttributes;
};
export default ShowBlockAttributes;
