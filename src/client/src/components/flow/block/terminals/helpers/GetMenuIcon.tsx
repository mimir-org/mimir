import { Node } from "../../../../../models";
import { IsLocation } from "../../../helpers/common";
import {
  TerminalsMenuLocationIcon,
  TerminalsMenuFunctionIcon,
  TerminalsMenuParent,
} from "../../../../../assets/icons/blockView";

const GetMenuIcon = (node: Node, isParent: boolean) => {
  if (isParent) return TerminalsMenuParent;
  if (IsLocation(node)) return TerminalsMenuLocationIcon;
  else return TerminalsMenuFunctionIcon;
};

export default GetMenuIcon;
