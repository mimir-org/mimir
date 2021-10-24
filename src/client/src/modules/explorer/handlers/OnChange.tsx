import { Node } from "../../../models";
import { IsLocation } from "../../../components/flow/helpers";
import { setSecondaryNode } from "../../../redux/store/secondaryNode/actions";
import { removeMainNodes } from "../../../components/flow/block/connectView/redux/actions";

const OnChange = (dispatch: any, isActive: boolean, setIsActive: any, node: Node, secondaryNode: Node) => {
  if (IsLocation(node)) return;

  if (isActive) {
    if (IsLocation(secondaryNode)) {
      setTimeout(() => {
        window.location.reload(); // Reload required because of Flow displaying wrong position for terminals
      }, 100);
    }
    dispatch(setSecondaryNode(null));
  }
  setIsActive(!isActive);
  dispatch(removeMainNodes());
};

export default OnChange;
