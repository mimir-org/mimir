import { LibItem } from "../../../models";
import { removeCustomCategoryNode } from "../../../redux/store/customCategory/customCategorySlice";

const OnRemoveFavoriteClick = (dispatch: any, item: LibItem) => {
  dispatch(removeCustomCategoryNode(item.id));
};

export default OnRemoveFavoriteClick;
