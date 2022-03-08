import { Dispatch } from "redux";
import { LibItem } from "../../../../../../../../../models";
import { removeCustomCategoryNode } from "../../../../../../../../../redux/store/customCategory/customCategorySlice";

const OnRemoveFavoriteClick = (item: LibItem, dispatch: Dispatch) => {
  dispatch(removeCustomCategoryNode(item.id));
};

export default OnRemoveFavoriteClick;
