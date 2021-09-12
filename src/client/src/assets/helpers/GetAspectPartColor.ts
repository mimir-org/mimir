import { Color } from "../../compLibrary";
import { Aspect } from "../../models";

const GetAspectPartColor = (aspect: Aspect) => {
  if (aspect === Aspect.Function) return Color.FunctionBlock;
  if (aspect === Aspect.Product) return Color.ProductBlock;
  if (aspect === Aspect.Location) return Color.LocationBlock;
};

export default GetAspectPartColor;
