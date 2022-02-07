import { Dispatch } from "redux";
import { LibItem } from "../../../models";
import { LibraryCategory } from "../../../models/project";
import { addCustomCategoryNode } from "../../../redux/store/customCategory/customCategorySlice";

const OnAddFavoriteClick = (dispatch: Dispatch, item: LibItem, customCategory: LibraryCategory) => {
  if (!customCategory?.nodes?.some((n) => n.id === item.id)) {
    dispatch(addCustomCategoryNode(item));
  }
};

export default OnAddFavoriteClick;
