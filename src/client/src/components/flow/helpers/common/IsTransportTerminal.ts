import { Connector } from "../../../../models";

const IsTransportTerminal = (conn: Connector) => {
    return conn.terminalCategoryId;
};

export default IsTransportTerminal;
