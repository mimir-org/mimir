import { Attribute } from "@mimirorg/modelbuilder-types";

const PixelCalculator = (attribute: Attribute): number => {
  const ratio = 150.0;

  if (!attribute || !attribute.value || !attribute.selectedUnitId) return 0.0;

  const unit = attribute.units.find((x) => x.id === attribute.selectedUnitId);
  if (!unit) return 0.0;

  let value = Number(attribute.value);

  switch (unit.name) {
    case "m":
      break;
    case "mm":
      value = value / 1000;
      break;
    default:
      throw new Error("Unit is missing or has invalid value.");
  }

  return Number(value * ratio);
};

export default PixelCalculator;
