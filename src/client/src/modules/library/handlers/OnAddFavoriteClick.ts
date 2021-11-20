import { LibItem } from "../../../models";
import { LibraryCategory } from "../../../models/project";
import { addCustomCategoryNode } from "../../../redux/store/customCategory/actions";

const OnAddFavoriteClick = (dispatch: any, item: LibItem, customCategory: LibraryCategory) => {
  if (!customCategory?.nodes?.some((n) => n.id === item.id)) {
    dispatch(addCustomCategoryNode(item));
  }
};

export default OnAddFavoriteClick;
