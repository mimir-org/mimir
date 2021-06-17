import { Connector } from "../../../../models";
import { IsInputConnector } from "../common";

const SortConnectors = (connectorList: Connector[]) => {
  connectorList.sort((a: Connector, b: Connector) => {
    if (a.type < b.type) return -1;
    if (a.type > b.type) return 1;
    return 0;
  });

  connectorList.sort((a: Connector, b: Connector) => {
    if (IsInputConnector(a) && IsInputConnector(b) && a.terminal < b.terminal)
      return -1;
    if (IsInputConnector(a) && IsInputConnector(b) && a.terminal > b.terminal)
      return 1;
    return 0;
  });

  connectorList.sort((a: Connector, b: Connector) => {
    if (!IsInputConnector(a) && !IsInputConnector(b) && a.terminal < b.terminal)
      return -1;
    if (!IsInputConnector(a) && !IsInputConnector(b) && a.terminal > b.terminal)
      return 1;
    return 0;
  });
  return connectorList;
};

export default SortConnectors;
