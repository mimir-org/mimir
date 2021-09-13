import { Node } from "../../../models";
import { IsLocation } from "../../../components/flow/helpers/common";
import {
  setSplitView,
  setSplitNode,
} from "../../../redux/store/splitView/actions";

const OnChange = (
  dispatch: any,
  isActive: boolean,
  setIsActive: any,
  node: Node
) => {
  if (IsLocation(node)) return;
  if (isActive) dispatch(setSplitNode(null));
  setIsActive(!isActive);
  dispatch(setSplitView(!isActive));
};

export default OnChange;