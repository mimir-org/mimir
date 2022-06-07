import { NodeLibCm } from "@mimirorg/typelibrary-types";
import { Dispatch } from "redux";
import { LibraryCategory } from "../../../../../../../../../models/project";
import { addCustomCategoryNode } from "../../../../../../../../../redux/store/customCategory/customCategorySlice";

const OnAddFavoriteClick = (node: NodeLibCm, customCategory: LibraryCategory, dispatch: Dispatch) => {
  if (!customCategory?.nodes?.some((n) => n.id === node.id)) {
    dispatch(addCustomCategoryNode(node));
  }
};

export default OnAddFavoriteClick;
