import { TextResources } from "../../../../../assets/text/TextResources";
import { Aspect, AspectObject } from "lib";

const GetNodeTypeString = (node: AspectObject) => {
  if (node.aspect === Aspect.Location) return TextResources.BLOCK_LOCATION;
  if (node.aspect === Aspect.Product) return TextResources.BLOCK_PRODUCT;
  if (node.aspect === Aspect.Function) return TextResources.BLOCK_FUNCTION;
};

export default GetNodeTypeString;
