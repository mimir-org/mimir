import { Node } from "../../../../../../models";
import { IsMainConnectNode } from "../../../connectView/helpers";
import { IsConnectNodeChecked } from "../helpers";
import { addConnectNode, addMainNode, removeConnectNode, removeMainNode } from "../../../connectView/redux/actions";

const OnConnectNodeClick = (node: Node, data: any, dispatch: any, connectNodes: Node[], showConnectMenu: any) => {
  if (!IsConnectNodeChecked(node, connectNodes)) {
    if (!IsMainConnectNode(data.id)) dispatch(addMainNode(data));
    dispatch(addConnectNode(data, node));
  } else {
    if (connectNodes.length === 1) {
      showConnectMenu(false);
      dispatch(removeMainNode(data));
    }
    dispatch(removeConnectNode(data, node));
  }
};

export default OnConnectNodeClick;
