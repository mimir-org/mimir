import * as Icons from "./terminalsMenu";
import { Aspect, AspectObject } from "lib";

/**
 * Function to get an icon for the terminals menu in BlockView.
 * @param node
 * @param isParent
 * @param isInput
 * @returns an icon
 */
export const GetMenuIcon = (node: AspectObject, isParent: boolean, isInput: boolean) => {
  if (isParent) return Icons.ParentMenu;

  if (node.aspect === Aspect.Location) {
    if (isInput) return Icons.LocationInputMenu;
    return Icons.LocationOutputMenu;
  }

  if (node.aspect === Aspect.Function) {
    if (isInput) return Icons.FunctionInputMenu;
    return Icons.FunctionOutputMenu;
  }

  if (node.aspect === Aspect.Product) {
    if (isInput) return Icons.ProductInputMenu;
    return Icons.ProductOutputMenu;
  }
};
