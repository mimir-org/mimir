import { Dispatch } from "redux";
import { Node } from "../../../../../../models";
import { removeActiveNode, setActiveNode } from "../../../../../../redux/store/project/actions";

export const OnSelectActiveNode = (mimirNode: Node, isChecked: boolean, dispatch: Dispatch) => {
  if (isChecked) dispatch(removeActiveNode());
  else dispatch(setActiveNode(mimirNode.id, true));
};
