import { LibItem } from "../../../models";
import { LibraryCategory } from "../../../models/project";
import { addCustomCategoryNode } from "../../../redux/store/customCategory/actions";

const SetNewSelectedElement = (item: LibItem, customCategory: LibraryCategory, dispatch: any, setSelectedElement: any) => {
  setSelectedElement(item.id);

  if (!customCategory?.nodes?.some((n) => n.id === item.id)) {
    dispatch(addCustomCategoryNode(item));
  }
};

export default SetNewSelectedElement;
