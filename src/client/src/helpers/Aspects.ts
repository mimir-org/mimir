import { Aspect, Node, NodeType } from "@mimirorg/modelbuilder-types";
import { NodeLibCm } from "@mimirorg/typelibrary-types";

type Item = Node | NodeLibCm;

export const IsAspectNode = (node: Node) => {
  return node?.nodeType === NodeType.Root;
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
