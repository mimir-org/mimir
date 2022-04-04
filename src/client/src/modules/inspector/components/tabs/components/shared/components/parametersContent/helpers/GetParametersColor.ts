import { Color } from "../../../../../../../../../compLibrary/colors/Color";

export const GetParametersColor = (index: number): [string, string] => {
  switch (index % 6) {
    case 0:
      return [Color.CADET_BLUE, Color.MYSTIC];

    case 1:
      return [Color.CORNFLOWER_BLUE, Color.LAVENDER];

    case 2:
      return [Color.FRENCH_MAUVE, Color.PALE_PURPLE_PANTONE];

    case 3:
      return [Color.CHOCOLATE, Color.LINEN];

    case 4:
      return [Color.ASPARAGUS, Color.NYANZA];

    case 5:
      return [Color.GOLDENROD, Color.CREAM];

    default:
      return [Color.CORNFLOWER_BLUE, Color.LAVENDER];
  }
};
