import * as Icons from "../../../../../assets/icons/blockView/terminalsMenu";
import { Node } from "../../../../../models";
import { IsFunction, IsLocation } from "../../../helpers/common";

/**
 * Function to get an icon for the terminals menu in BlockView.
 * @param node
 * @param isParent
 * @param isInput
 * @returns an icon
 */
const GetMenuIcon = (node: Node, isParent: boolean, isInput: boolean) => {
  if (isParent) return Icons.TerminalsParentMenu;
  if (IsLocation(node)) return Icons.TerminalsLocationMenu;
  if (IsFunction(node)) {
    if (isInput) return Icons.TerminalsInputMenu;
    else return Icons.TerminalsOutputMenu;
  }
};

export default GetMenuIcon;
