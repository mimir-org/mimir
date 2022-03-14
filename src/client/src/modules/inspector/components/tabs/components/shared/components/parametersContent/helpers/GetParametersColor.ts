import { Color } from "../../../../../../../../../compLibrary/colors/Color";

export const GetParametersColor = (index: number): [string, string] => {
  switch (index % 6) {
    case 0:
      return [Color.PARAMS_CYAN, Color.PARAMS_CYAN_LIGHT];

    case 1:
      return [Color.PARAMS_PURPLE, Color.PARAMS_PURPLE_LIGHT];

    case 2:
      return [Color.PARAMS_PINK, Color.PARAMS_PINK_LIGHT];

    case 3:
      return [Color.PARAMS_ORANGE, Color.PARAMS_ORANGE_LIGHT];

    case 4:
      return [Color.PARAMS_GREEN, Color.PARAMS_GREEN_LIGHT];

    case 5:
      return [Color.PARAMS_YELLOW, Color.PARAMS_YELLOW_LIGHT];

    default:
      return [Color.PARAMS_PURPLE, Color.PARAMS_PURPLE_LIGHT];
  }
};
