import { Dispatch } from "redux";
// import { removeSelectedNode, setSelectedNode } from "../../../../../../redux/store/project/actions";
import { AspectObject } from "lib";

export const OnSelectActiveNode = (mimirNode: AspectObject, isChecked: boolean, dispatch: Dispatch) => {
  if (isChecked) {
    // dispatch(removeSelectedNode());
  } else {
    //dispatch(setSelectedNode(mimirNode.id));
  }
};
