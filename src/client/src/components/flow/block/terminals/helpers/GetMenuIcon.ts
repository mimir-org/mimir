import * as Icons from "../../../../../assets/icons/terminalsMenu";
import { IsFunction, IsLocation, IsProduct } from "../../../../../helpers/CheckTypes";
import { Node } from "../../../../../models";

/**
 * Function to get an icon for the terminals menu in BlockView.
 * @param node
 * @param isParent
 * @param isInput
 * @returns an icon
 */
const GetMenuIcon = (node: Node, isParent: boolean, isInput: boolean) => {
  if (isParent) return Icons.ParentMenu;

  if (IsLocation(node)) {
    if (isInput) return Icons.LocationInputMenu;
    return Icons.LocationOutputMenu;
  }

  if (IsFunction(node)) {
    if (isInput) return Icons.FunctionInputMenu;
    return Icons.FunctionOutputMenu;
  }

  if (IsProduct(node)) {
    if (isInput) return Icons.ProductInputMenu;
    return Icons.ProductOutputMenu;
  }
};

export default GetMenuIcon;
