import { Attribute } from "@mimirorg/modelbuilder-types";
import { PixelCalculator } from ".";

export interface Position {
  relativeX: number;
  relativeY: number;
  relativeZ: number;
}

const GetPosition = (map: Map<string, Attribute>, isRoot: boolean): Position => {
  if (isRoot) {
    return {
      relativeX: 0.0,
      relativeY: 0.0,
      relativeZ: 0.0,
    } as Position;
  }

  const relativeEastAttribute = map.get("Relative East");
  const relativeElevationAttribute = map.get("Relative Elevation");
  const relativeNorthAttribute = map.get("Relative North");

  return {
    relativeX: PixelCalculator(relativeEastAttribute),
    relativeY: PixelCalculator(relativeElevationAttribute),
    relativeZ: PixelCalculator(relativeNorthAttribute),
  } as Position;
};

export default GetPosition;
