import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { SortTerminals } from ".";
import { Aspect, Connector } from "../../../../models";
import {
  IsFulfilledByTerminal,
  IsInputTerminal,
  IsLocationTerminal,
  IsPartOfTerminal,
  IsTransportTerminal,
} from "../common";

const FilterTerminals = (terminals, aspect) => {
  const filteredTerminals: Connector[] = [];
  const splitView = useSelector<RootState>(
    (state) => state.splitView.visible
  ) as boolean;

  if (terminals === null || aspect === null) return filteredTerminals;

  // SplitView
  terminals.forEach((conn) => {
    if (aspect === Aspect.Location) {
      if (IsInputTerminal(conn) && IsLocationTerminal(conn))
        filteredTerminals.push(conn);
    }
    if (aspect !== Aspect.Location) {
      if (!IsInputTerminal(conn) && IsLocationTerminal(conn))
        filteredTerminals.push(conn);
    }
  });

  if (!splitView) {
    terminals.forEach((conn) => {
      if (
        IsTransportTerminal(conn) &&
        !IsLocationTerminal(conn) &&
        !IsPartOfTerminal(conn) &&
        !IsFulfilledByTerminal(conn)
      )
        filteredTerminals.push(conn);
    });
  }

  return SortTerminals(filteredTerminals);
};

export default FilterTerminals;
