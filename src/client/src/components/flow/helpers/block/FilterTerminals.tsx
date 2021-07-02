import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { SortConnectors } from ".";
import { Aspect, Connector } from "../../../../models";
import {
  IsFulfilledByTerminal,
  IsInputConnector,
  IsLocationTerminal,
  IsPartOfTerminal,
  IsTransportTerminal,
} from "../common";

const FilterTerminals = (connectors, aspect) => {
  const connectorList: Connector[] = [];
  const splitView = useSelector<RootState>(
    (state) => state.splitView.visible
  ) as boolean;

  if (connectors === null || aspect === null) return connectorList;

  // SplitView
  connectors.forEach((conn) => {
    if (aspect === Aspect.Location) {
      if (IsInputConnector(conn) && IsLocationTerminal(conn))
        connectorList.push(conn);
    }
    if (aspect !== Aspect.Location) {
      if (!IsInputConnector(conn) && IsLocationTerminal(conn))
        connectorList.push(conn);
    }
  });

  if (!splitView) {
    connectors.forEach((conn) => {
      if (
        IsTransportTerminal(conn) &&
        !IsLocationTerminal(conn) &&
        !IsPartOfTerminal(conn) &&
        !IsFulfilledByTerminal(conn)
      )
        connectorList.push(conn);
    });
  }

  return SortConnectors(connectorList);
};

export default FilterTerminals;
