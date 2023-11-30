import { Dispatch } from "redux";
// import { removeSelectedNode, setSelectedNode } from "../../../../../../redux/store/project/actions";
import { Block } from "lib";

export const OnSelectActiveNode = (mimirNode: Block, isChecked: boolean, dispatch: Dispatch) => {
  if (isChecked) {
    // dispatch(removeSelectedNode());
  } else {
    //dispatch(setSelectedNode(mimirNode.id));
  }
};
