import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { NODE_TYPE } from "../../../../models/project";
import { SortConnectors } from ".";
import { Connector } from "../../../../models";
import {
  IsInputConnector,
  IsLocation,
  IsLocationTerminal,
  IsTransportTerminal,
} from "../common";

const FilterConnectors = (connectors, type) => {
  const isLocationNode = useSelector<RootState>((state) =>
    IsLocation(state.splitView.node)
  ) as boolean;

  const connectorList: Connector[] = [];

  if (type === NODE_TYPE.LOCATION) {
    connectors.forEach((conn) => {
      IsLocationTerminal(conn) &&
        IsInputConnector(conn) &&
        connectorList.push(conn);
    });
    return connectorList;
  }

  connectors.forEach((conn) => {
    IsTransportTerminal(conn) && !isLocationNode && connectorList.push(conn);
    IsLocationTerminal(conn) &&
      isLocationNode &&
      !IsInputConnector(conn) &&
      connectorList.push(conn);
  });
  return SortConnectors(connectorList);
};

export default FilterConnectors;
