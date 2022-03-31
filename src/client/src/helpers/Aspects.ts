import { Aspect, CreateLibraryType, LibItem, Node } from "../models";

export const IsAspectNode = (node: Node) => {
  return node?.isRoot;
};

export const IsLocation = (item: Node | LibItem | CreateLibraryType) => {
  return item?.aspect === Aspect.Location;
};

export const IsProduct = (item: Node | LibItem | CreateLibraryType) => {
  return item?.aspect === Aspect.Product;
};

export const IsFunction = (item: Node | LibItem | CreateLibraryType) => {
  return item?.aspect === Aspect.Function;
};

export const IsOffPage = (node: Node) => {
  return node?.aspect === Aspect.None;
};
