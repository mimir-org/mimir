import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { SortConnectors } from ".";
import { Aspect, Connector } from "../../../../models";
import {
  IsFulfilledByTerminal,
  IsInputConnector,
  IsLocation,
  IsLocationTerminal,
  IsPartOfTerminal,
  IsTransportTerminal,
} from "../common";

const FilterTerminals = (connectors, aspect) => {
  const isLocationNode = useSelector<RootState>((state) =>
    IsLocation(state.splitView.node)
  ) as boolean;

  if (connectors === null || aspect === null) return [];

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
    IsTransportTerminal(conn) &&
      !IsLocationTerminal(conn) &&
      !IsPartOfTerminal(conn) &&
      !IsFulfilledByTerminal(conn) &&
      !isLocationNode &&
      connectorList.push(conn);

    // SplitView with Location
    IsLocationTerminal(conn) &&
      isLocationNode &&
      !IsInputConnector(conn) &&
      connectorList.push(conn);
  });
  return SortConnectors(connectorList);
};

export default FilterTerminals;
