import { Connector } from "../../../../models/project";

const SetConnectorPosition = (connectors: Connector[]) => {
  const connectorCount = connectors.length;

  if (connectorCount === 1) {
    return 50;
  }

  if (connectorCount === 2) {
    const firstConn = document.getElementById("handle-" + connectors[0].id);
    if (firstConn) firstConn.style.top = "25%";

    return 75;
  }

  if (connectorCount === 3) {
    const firstConn = document.getElementById("handle-" + connectors[0].id);
    if (firstConn) firstConn.style.top = "5%";

    const secondConn = document.getElementById("handle-" + connectors[1].id);
    if (secondConn) secondConn.style.top = "50%";

    return 95;
  }

  if (connectorCount === 4) {
    const firstConn = document.getElementById("handle-" + connectors[0].id);
    if (firstConn) firstConn.style.top = "0%";

    const secondConn = document.getElementById("handle-" + connectors[1].id);
    if (secondConn) secondConn.style.top = "33%";

    const thirdConn = document.getElementById("handle-" + connectors[2].id);
    if (thirdConn) thirdConn.style.top = "67%";

    return 100;
  }
};

export default SetConnectorPosition;
