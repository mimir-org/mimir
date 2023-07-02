import {
  FunctionFilterIcon,
  FunctionIcon,
  LocationFilterIcon,
  LocationIcon,
  ProductFilterIcon,
  ProductIcon,
} from "@mimirorg/component-library";
import { Aspect } from "../../../../../../lib/enums";

export const GetFilterIcon = (aspect: Aspect, selected: boolean) => {
  if (aspect === Aspect.Function) return selected ? FunctionIcon : FunctionFilterIcon;
  if (aspect === Aspect.Product) return selected ? ProductIcon : ProductFilterIcon;
  if (aspect === Aspect.Location) return selected ? LocationIcon : LocationFilterIcon;
};
