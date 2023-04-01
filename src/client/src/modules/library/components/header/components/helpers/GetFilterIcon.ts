import {
  Function,
  FunctionFilterOff,
  Product,
  ProductFilterOff,
  Location,
  LocationFilterOff,
} from "../../../../../../assets/icons/aspects";
import { Aspect } from "../../../../../../lib/enums";

export const GetFilterIcon = (aspect: Aspect, selected: boolean) => {
  if (aspect === Aspect.Function) return selected ? Function : FunctionFilterOff;
  if (aspect === Aspect.Product) return selected ? Product : ProductFilterOff;
  if (aspect === Aspect.Location) return selected ? Location : LocationFilterOff;
};
