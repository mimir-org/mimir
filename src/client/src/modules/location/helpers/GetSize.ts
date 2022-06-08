import { Attribute } from "@mimirorg/modelbuilder-types";
import { PixelCalculator } from ".";

export interface Size {
  width: number;
  height: number;
  depth: number;
}

const GetSize = (map: Map<string, Attribute>): Size => {
  const widthAttribute = map.get("Size box Width");
  const heightAttribute = map.get("Size box Height");
  const depthAttribute = map.get("Size box Length");

  return {
    width: PixelCalculator(widthAttribute),
    height: PixelCalculator(heightAttribute),
    depth: PixelCalculator(depthAttribute),
  } as Size;
};

export default GetSize;
