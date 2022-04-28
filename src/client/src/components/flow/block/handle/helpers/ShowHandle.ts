import { Connector } from "../../../../../models";
import { IsBidirectionalTerminal, IsInputVisible, IsOutputVisible, IsConnectorVisible } from "../../../helpers/Connectors";

/**
 * Component to determine if a handle/connector should be displayed in BlockView.
 * @param connector
 * @param isInput
 * @returns a boolean value.
 */
const ShowHandle = (connector: Connector, isInput: boolean) => {
  if (IsBidirectionalTerminal(connector)) return isInput ? IsInputVisible(connector) : IsOutputVisible(connector);
  return IsConnectorVisible(connector);
};

export default ShowHandle;
