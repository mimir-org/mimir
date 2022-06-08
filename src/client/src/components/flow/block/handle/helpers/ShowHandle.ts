import { Connector } from "@mimirorg/modelbuilder-types";
import { IsBidirectionalTerminal, IsInputVisible, IsOutputVisible, IsConnectorVisible } from "../../../helpers/Connectors";

/**
 * Component to determine if a handle/connector should be displayed in BlockView.
 * @param connector
 * @param isInput
 * @param isProduct
 * @returns a boolean value.
 */
const ShowHandle = (connector: Connector, isInput: boolean, isProduct: boolean) => {
  if (IsBidirectionalTerminal(connector)) return isInput ? IsInputVisible(connector) : IsOutputVisible(connector);
  // if (isProduct) return IsConnectorVisible(connector) || IsPartOfRelation(connector); // TODO: fix
  return IsConnectorVisible(connector);
};

export default ShowHandle;
