import { TERMINAL } from "../../../models/project";
import {
  ConnectorFluidIcon,
  ConnectorGasIcon,
  ConnectorIcon,
  ConnectorOilIcon,
  ConnectorWaterIcon,
  ConnectorSandIcon,
} from "../../../assets/icons/blockView";

const GetConnectorIcon = (type: string) => {
  let icon =
    type === TERMINAL.Fluid
      ? ConnectorFluidIcon
      : type === TERMINAL.Gas
      ? ConnectorGasIcon
      : type === TERMINAL.Oil
      ? ConnectorOilIcon
      : type === TERMINAL.Water
      ? ConnectorWaterIcon
      : type === TERMINAL.WetGas
      ? ConnectorIcon
      : type === TERMINAL.Wind
      ? ConnectorIcon
      : type === TERMINAL.Vapour
      ? ConnectorIcon
      : type === TERMINAL.Thermal
      ? ConnectorIcon
      : type === TERMINAL.Pieces
      ? ConnectorIcon
      : type === TERMINAL.Powder
      ? ConnectorIcon
      : type === TERMINAL.Sand
      ? ConnectorSandIcon
      : type === TERMINAL.Sensor
      ? ConnectorIcon
      : type === TERMINAL.Solar
      ? ConnectorIcon
      : type === TERMINAL.SolidPieces
      ? ConnectorIcon
      : type === TERMINAL.NotSet
      ? ConnectorIcon
      : type === TERMINAL.Bolts
      ? ConnectorIcon
      : ConnectorIcon;

  return icon;
};

export default GetConnectorIcon;
