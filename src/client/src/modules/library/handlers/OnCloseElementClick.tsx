import { LibItem } from "../../../models";
import { removeCustomCategoryNode } from "../../../redux/store/customCategory/actions";

const OnCloseElementClick = (dispatch: any, item: LibItem) => {
  dispatch(removeCustomCategoryNode(item));
};

export default OnCloseElementClick;
