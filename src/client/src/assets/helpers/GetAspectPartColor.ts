import { Color } from "../../compLibrary";
import { Aspect } from "../../models";

const GetAspectPartColor = (aspect: Aspect) => {
  if (aspect === Aspect.Function) return Color.FunctionMain;
  if (aspect === Aspect.Product) return Color.ProductMain;
  if (aspect === Aspect.Location) return Color.LocationMain;
};

export default GetAspectPartColor;
