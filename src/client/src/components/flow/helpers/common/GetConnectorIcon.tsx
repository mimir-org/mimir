import { Connector } from "../../../../models";
import { Color } from "../../../../compLibrary";
import {
  ConnectorGasIcon,
  ConnectorIcon,
  ConnectorMultiphaseIcon,
  ConnectorOilIcon,
  ConnectorWaterIcon,
} from "../../../../assets/icons/blockView";

const GetConnectorIcon = (conn: Connector) => {
  if (conn.color === Color.Terminal_Oil) return ConnectorOilIcon;
  if (conn.color === Color.Terminal_Water) return ConnectorWaterIcon;
  if (conn.color === Color.Terminal_Gas) return ConnectorGasIcon;
  if (conn.color === Color.Terminal_Multiphase) return ConnectorMultiphaseIcon;

  return ConnectorIcon;
};

export default GetConnectorIcon;
