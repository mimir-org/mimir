import { Color } from "../../../../compLibrary";
import { Node } from "../../../../models";
import {
  IsFunction,
  IsLocation,
  IsProduct,
} from "../../../flow/helpers/common";

const GetTabsColor = (node: Node) => {
  if (IsFunction(node)) return Color.FunctionSelected;
  if (IsLocation(node)) return Color.LocationTab;
  if (IsProduct(node)) return Color.ProductInspector;
};

export default GetTabsColor;
