import { LibItem } from "../../../models";
import { removeCustomCategoryNode } from "../../../redux/store/customCategory/actions";

const OnRemoveElementClick = (dispatch: any, item: LibItem) => {
  dispatch(removeCustomCategoryNode(item));
};

export default OnRemoveElementClick;
