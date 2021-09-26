import { Node } from "../../../../../models";
import {
  removeConnectNodes,
  removeMainNodes,
} from "../../../../../redux/store/connectView/actions";

const OnClearAllClick = (dispatch: any, node: Node) => {
  dispatch(removeConnectNodes(node));
  dispatch(removeMainNodes());
};

export default OnClearAllClick;
