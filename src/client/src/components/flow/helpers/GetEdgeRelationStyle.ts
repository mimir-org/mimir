import { Color } from "../../../compLibrary/colors";
import { IsProduct } from "../../../helpers";
import { Node } from "../../../models";

const GetEdgeRelationStyle = (source: Node, visible: boolean) => {
  const getColor = () => {
    if (IsProduct(source)) return Color.ProductSelected;
    return Color.LocationSelected;
  };

  return {
    stroke: getColor(),
    strokeDasharray: 2.5,
    strokeWidth: "2px",
    opacity: visible ? 1 : 0,
    transition: "opacity 250ms",
  };
};

export default GetEdgeRelationStyle;
