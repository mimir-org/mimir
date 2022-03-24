import { Aspect, CreateLibraryType, LibItem, Node } from "../models";
import { MODULE_TYPE } from "../models/project";

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

export const IsFamily = (element: Node | LibItem, elementToCheck: Node | LibItem) => {
  return element?.aspect === elementToCheck?.aspect;
};

export const IsExplorer = (module: string) => {
  return module === MODULE_TYPE.EXPLORER;
};

export const IsLibrary = (module: string) => {
  return module === MODULE_TYPE.LIBRARY;
};
