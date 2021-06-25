import { Color } from "../../../../compLibrary";
import {
  ConnectorGasIcon,
  ConnectorIcon,
  ConnectorMultiphaseIcon,
  ConnectorOilIcon,
  ConnectorWaterIcon,
} from "../../../../assets/icons/blockView";

const GetConnectorIcon = (color: string) => {
  if (color === Color.Terminal_Oil) return ConnectorOilIcon;
  if (color === Color.Terminal_Water) return ConnectorWaterIcon;
  if (color === Color.Terminal_Gas) return ConnectorGasIcon;
  if (color === Color.Terminal_Multiphase) return ConnectorMultiphaseIcon;

  return ConnectorIcon;
};

export default GetConnectorIcon;
