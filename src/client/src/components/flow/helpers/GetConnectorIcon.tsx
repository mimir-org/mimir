import { Color } from "../../../compLibrary";
import {
  ConnectorIcon,
  GasIcon,
  MultiphaseIcon,
  OilIcon,
  WaterIcon,
} from "../../../assets/icons/blockView";

const GetConnectorIcon = (color: string) => {
  if (color === Color.Terminal_Oil) return OilIcon;
  if (color === Color.Terminal_Water) return WaterIcon;
  if (color === Color.Terminal_Gas) return GasIcon;
  if (color === Color.Terminal_Multiphase) return MultiphaseIcon;

  return ConnectorIcon;
};

export default GetConnectorIcon;
