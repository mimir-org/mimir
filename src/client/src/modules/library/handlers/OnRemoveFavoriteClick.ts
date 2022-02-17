import { Dispatch } from "redux";
import { LibItem } from "../../../models";
import { removeCustomCategoryNode } from "../../../redux/store/customCategory/customCategorySlice";

export const OnRemoveFavoriteClick = (dispatch: Dispatch, item: LibItem) => {
  dispatch(removeCustomCategoryNode(item.id));
};
