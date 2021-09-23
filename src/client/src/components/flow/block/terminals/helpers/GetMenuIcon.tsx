import { Node } from "../../../../../models";
import { IsLocation } from "../../../helpers/common";
import {
  TerminalsMenuLocationIcon,
  TerminalsMenuFunctionIcon,
} from "../../../../../assets/icons/blockView";

const GetMenuIcon = (node: Node) => {
  if (IsLocation(node)) return TerminalsMenuLocationIcon;
  else return TerminalsMenuFunctionIcon;
};

export default GetMenuIcon;
