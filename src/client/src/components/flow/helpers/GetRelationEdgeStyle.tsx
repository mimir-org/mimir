import { Color } from "../../../compLibrary";
import { IsLocation, IsProduct } from "../../../helpers";
import { Node } from "../../../models";

const GetRelationEdgeStyle = (source: Node, visible: boolean) => {
  const getColor = () => {
    if (IsLocation(source)) return Color.LocationSelected;
    if (IsProduct(source)) return Color.ProductSelected;
  };

  return {
    stroke: getColor(),
    strokeDasharray: 2.5,
    strokeWidth: "3px",
    opacity: visible ? 1 : 0,
    transition: "opacity 250ms",
  };
};

export default GetRelationEdgeStyle;
