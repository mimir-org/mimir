import { Node } from "../../../../../models";
import { IsMainConnectNode } from "../../../helpers/block/connectView";
import { Size } from "../../../../../compLibrary";

import {
  addConnectNodes,
  addMainNode,
} from "../../../../../redux/store/connectView/actions";

const OnSelectAllClick = (dispatch: any, node: Node, connectNodes: Node[]) => {
  if (!IsMainConnectNode(node.id)) {
    dispatch(addMainNode(node));
    node.width = Size.ConnectView_Width;
    node.length = Size.ConnectView_Length;
  }

  dispatch(addConnectNodes(node, connectNodes));
};

export default OnSelectAllClick;
