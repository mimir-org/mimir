import { NodeLibCm } from "@mimirorg/typelibrary-types";
import { Dispatch } from "redux";
import { LibraryCategory } from "../../../../../../../../../models/project";
import {
  addCustomCategoryNode,
  removeCustomCategoryNode,
} from "../../../../../../../../../redux/store/customCategory/customCategorySlice";

const OnFavoriteClick = (
  item: NodeLibCm,
  customCategory: LibraryCategory,
  shouldAddFavorite: boolean,
  isCustomCategory: boolean,
  dispatch: Dispatch
) => {
  if (shouldAddFavorite) return OnAddFavoriteClick(item, customCategory, dispatch);
  if (isCustomCategory && !shouldAddFavorite) return OnRemoveFavoriteClick(item, dispatch);
};

const OnAddFavoriteClick = (node: NodeLibCm, customCategory: LibraryCategory, dispatch: Dispatch) => {
  if (!customCategory?.nodes?.some((n) => n.id === node.id)) {
    dispatch(addCustomCategoryNode(node));
  }
};

const OnRemoveFavoriteClick = (node: NodeLibCm, dispatch: Dispatch) => {
  dispatch(removeCustomCategoryNode(node.id));
};

export default OnFavoriteClick;
