import { Dispatch } from "redux";
import { Node } from "../../../../../../models";
import { removeSelectedNode, setSelectedNode } from "../../../../../../redux/store/project/actions";

export const OnSelectActiveNode = (mimirNode: Node, isChecked: boolean, dispatch: Dispatch) => {
  if (isChecked) dispatch(removeSelectedNode());
  else dispatch(setSelectedNode(mimirNode.id));
};
