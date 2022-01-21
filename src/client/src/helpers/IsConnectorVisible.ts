import { IsInputVisible, IsOutputVisible } from "../components/flow/helpers";
import { Connector } from "../models";

const IsConnectorVisible = (conn: Connector) => {
  return IsInputVisible(conn) || IsOutputVisible(conn);
};

export default IsConnectorVisible;
