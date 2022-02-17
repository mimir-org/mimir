import { Aspect } from "../../../../../../../models";

export const SortTypesByAspect = (
  aspect: Aspect,
  functionSort,
  productSort,
  locationSort,
  setFunctionSort,
  setProductSort,
  setLocationSort
) => {
  if (aspect === Aspect.Function) setFunctionSort(!functionSort);
  if (aspect === Aspect.Product) setProductSort(!productSort);
  if (aspect === Aspect.Location) setLocationSort(!locationSort);
};
