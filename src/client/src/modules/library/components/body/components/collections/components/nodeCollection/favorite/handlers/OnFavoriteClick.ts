import { NodeLibCm } from "@mimirorg/typelibrary-types";
import { Dispatch } from "redux";
import {
  addCustomCategoryNode,
  removeCustomCategoryNode,
} from "../../../../../../../../../../redux/store/customCategory/customCategorySlice";

export const OnFavoriteClick = (item: NodeLibCm, addNewFavorite: boolean, dispatch: Dispatch) => {
  return addNewFavorite ? AddFavoriteNode(item, dispatch) : RemoveFavoriteNode(item, dispatch);
};

function AddFavoriteNode(node: NodeLibCm, dispatch: Dispatch) {
  dispatch(addCustomCategoryNode(node));
}

function RemoveFavoriteNode(node: NodeLibCm, dispatch: Dispatch) {
  dispatch(removeCustomCategoryNode(node.id));
}
