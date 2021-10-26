import { Node } from "../../../models";
import { IsLocation, IsProduct } from "../../../components/flow/helpers";
import { setSplitView, setSplitParentNode } from "../../../redux/store/splitView/actions";
import { removeMainNodes } from "../../../components/flow/block/connectView/redux/actions";

const OnChange = (dispatch: any, isActive: boolean, setIsActive: any, node: Node, splitNode: Node) => {
  if (IsLocation(node)) return;

  if (isActive) {
    if (IsLocation(splitNode) || IsProduct(splitNode)) {
      setTimeout(() => {
        window.location.reload(); // Reload required because of Flow displaying wrong position for terminals
      }, 100);
    }
    dispatch(setSplitParentNode(null));
  }
  setIsActive(!isActive);

  dispatch(setSplitView(!isActive));
  dispatch(removeMainNodes());
};

export default OnChange;
