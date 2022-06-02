import { NodeLibCm } from "@mimirorg/typelibrary-types";
import { Aspect, CreateLibraryType, Node } from "../models";

type Item = Node | NodeLibCm | CreateLibraryType;

export const IsAspectNode = (node: Node) => {
  return node?.isRoot;
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

export const IsOffPage = (node: Node) => {
  return node?.aspect === Aspect.None;
};
