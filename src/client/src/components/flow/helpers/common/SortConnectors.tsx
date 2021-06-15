import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { Connector } from "../../../../models/project";
import {
  IsInputConnector,
  IsLocationNode,
  IsLocationTerminal,
  IsTransportTerminal,
} from ".";

const SortConnectors = (connectors) => {
  const isLocationNode = useSelector<RootState>((state) =>
    IsLocationNode(state.splitView.node)
  ) as boolean;

  const connectorList: Connector[] = [];

  connectors.forEach((conn) => {
    IsTransportTerminal(conn) && !isLocationNode && connectorList.push(conn);
    IsLocationTerminal(conn) &&
      isLocationNode &&
      !IsInputConnector(conn) &&
      connectorList.push(conn);
  });

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
