import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { SortConnectors } from ".";
import { Aspect, Connector } from "../../../../models";
import {
  IsInputConnector,
  IsLocation,
  IsLocationTerminal,
  IsTransportTerminal,
} from "../common";

const FilterConnectors = (connectors, aspect) => {
  const isLocationNode = useSelector<RootState>((state) =>
    IsLocation(state.splitView.node)
  ) as boolean;

  const connectorList: Connector[] = [];

  if (aspect === Aspect.Location) {
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
