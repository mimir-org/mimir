import { Aspect, Node } from "@mimirorg/modelbuilder-types";
import { NodeLibCm } from "@mimirorg/typelibrary-types";
import { CreateLibraryType } from "../models";

type Item = Node | NodeLibCm | CreateLibraryType;

export const IsAspectNode = (node: Node) => {
  return node?.isRoot;
};

export const IsOffPage = (node: Node) => {
  return node?.aspect === Aspect.None;
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
