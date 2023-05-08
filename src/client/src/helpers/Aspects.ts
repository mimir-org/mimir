import { AspectObjectLibCm } from "@mimirorg/typelibrary-types";
import { AspectObject, Aspect } from "lib";

type Item = AspectObject | AspectObjectLibCm;

export const IsAspectNode = (node: AspectObject) => {
  return node?.libraryType == null;
};

export const IsLocation = (item: Item) => {
  return item?.aspect === Aspect.Location;
};

export const IsProduct = (item: Item) => {
  return item?.aspect === Aspect.Product;
};

export const IsFunction = (item: Item) => {
  return item?.aspect === Aspect.Function;
};
