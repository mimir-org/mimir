import { Color } from "../../compLibrary";
import { Aspect } from "../../models";

const GetAspectPartColor = (
    aspect: Aspect
) => {
    if (aspect === Aspect.Function) return Color.FunctionPart;
    if (aspect === Aspect.Product) return Color.ProductPart;
    if (aspect === Aspect.Location) return Color.LocationPart;
};

export default GetAspectPartColor;