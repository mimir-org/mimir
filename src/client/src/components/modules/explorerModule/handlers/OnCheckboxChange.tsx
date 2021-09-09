import { removeMainNodes } from "../../../../redux/store/connectView/actions";
import { Node } from "../../../../models";
import { setActiveNode } from "../../../../redux/store/project/actions";
import { setSplitNode } from "../../../../redux/store/splitView/actions";
import { IsConnectView } from "../../../flow/helpers/block/connectView";
import { IsFunction } from "../../../flow/helpers/common";

const OnCheckboxChange = (dispatch: any, splitView: boolean, node: Node) => {
  if (IsConnectView()) {
    dispatch(removeMainNodes());
  }
  if (splitView) {
    IsFunction(node)
      ? dispatch(setActiveNode(node.id, true))
      : dispatch(setSplitNode(node));
  } else dispatch(setActiveNode(node.id, true));
};

export default OnCheckboxChange;
