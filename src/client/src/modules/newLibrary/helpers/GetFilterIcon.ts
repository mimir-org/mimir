import { Aspect } from "../../../models";
import {
  Function,
  FunctionFilterOff,
  Product,
  ProductFilterOff,
  Location,
  LocationFilterOff,
} from "../../../assets/icons/aspects";

const GetFilterIcon = (aspect: Aspect, functionSort: boolean, productSort: boolean, locationSort: boolean) => {
  if (aspect === Aspect.Function) return functionSort ? Function : FunctionFilterOff;
  if (aspect === Aspect.Product) return productSort ? Product : ProductFilterOff;
  if (aspect === Aspect.Location) return locationSort ? Location : LocationFilterOff;
};

export default GetFilterIcon;
