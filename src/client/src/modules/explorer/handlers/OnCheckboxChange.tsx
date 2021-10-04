import { removeMainNodes } from "../../../redux/store/connectView/actions";
import { Node } from "../../../models";
import { setSplitNode } from "../../../redux/store/splitView/actions";
import { IsConnectView } from "../../../components/flow/helpers/block/connectView";
import { IsFunction } from "../../../components/flow/helpers/common";
import {
  setActiveNode,
  setActiveBlockNode,
  setActiveEdge,
} from "../../../redux/store/project/actions";

const OnCheckboxChange = (dispatch: any, splitView: boolean, node: Node) => {
  if (IsConnectView()) {
    dispatch(removeMainNodes());
  }
  if (splitView) {
    IsFunction(node)
      ? dispatch(setActiveNode(node.id, true))
      : dispatch(setSplitNode(node));
  } else {
    dispatch(setActiveEdge(null, false));
    dispatch(setActiveBlockNode(node.id));
    dispatch(setActiveNode(node.id, true));
  }
};

export default OnCheckboxChange;
