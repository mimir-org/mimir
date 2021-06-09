import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import {
  IsInputConnector,
  IsLocationNode,
  IsLocationTerminal,
  IsTransportTerminal,
} from ".";

const SortConnectors = (connectors) => {
  const list = [];
  const isLocationNode = useSelector<RootState>((state) =>
    IsLocationNode(state.splitView.node)
  ) as boolean;

  connectors.forEach((conn) => {
    IsTransportTerminal(conn) && !isLocationNode && list.push(conn);
    IsLocationTerminal(conn) &&
      isLocationNode &&
      !IsInputConnector(conn) &&
      list.push(conn);
  });
  return list;
};

export default SortConnectors;
