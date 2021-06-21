import { Color } from "../../../../compLibrary";
import { Connector } from "../../../../models";

const IsTransportTerminal = (conn: Connector) => {
  console.log(conn);
  //   return conn?.terminalCategoryId != null;
  return conn.color === Color.Terminal_Water;
};

export default IsTransportTerminal;
