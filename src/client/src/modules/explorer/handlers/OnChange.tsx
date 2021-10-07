import { Node } from "../../../models";
import { IsLocation } from "../../../components/flow/helpers";
import { setSplitView, setSplitParentNode } from "../../../redux/store/splitView/actions";
import { removeMainNodes } from "../../../components/flow/block/connectView/redux/actions";

const OnChange = (dispatch: any, isActive: boolean, setIsActive: any, node: Node) => {
  if (IsLocation(node)) return;
  if (isActive) dispatch(setSplitParentNode(null));
  setIsActive(!isActive);

  dispatch(setSplitView(!isActive));
  dispatch(removeMainNodes());
};

export default OnChange;
