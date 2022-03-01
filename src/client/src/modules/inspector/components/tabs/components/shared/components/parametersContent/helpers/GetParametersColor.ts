import { Color } from "../../../../../../../../../compLibrary/colors";

export const GetParametersColor = (index: number): [string, string] => {
  switch (index % 6) {
    case 0:
      return [Color.ParamsCyan, Color.ParamsLightCyan];

    case 1:
      return [Color.ParamsPurple, Color.ParamsLightPurple];

    case 2:
      return [Color.ParamsPink, Color.ParamsLightPink];

    case 3:
      return [Color.ParamsOrange, Color.ParamsLightOrange];

    case 4:
      return [Color.ParamsGreen, Color.ParamsLightGreen];

    case 5:
      return [Color.ParamsYellow, Color.ParamsLightYellow];

    default:
      return [Color.ParamsPurple, Color.ParamsLightPurple];
  }
};
