import { NodeLibCm } from "@mimirorg/typelibrary-types";
import { Dispatch } from "redux";
import { removeCustomCategoryNode } from "../../../../../../../../../redux/store/customCategory/customCategorySlice";

const OnRemoveFavoriteClick = (node: NodeLibCm, dispatch: Dispatch) => {
  dispatch(removeCustomCategoryNode(node.id));
};

export default OnRemoveFavoriteClick;
