import { LibItem } from "../../../models";
import { removeCustomCategoryNode } from "../../../redux/store/customCategory/actions";

const OnRemoveFavoriteClick = (dispatch: any, item: LibItem) => {
  dispatch(removeCustomCategoryNode(item));
};

export default OnRemoveFavoriteClick;
