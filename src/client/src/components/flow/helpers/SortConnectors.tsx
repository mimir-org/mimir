import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { IsLocationNode, IsLocationTerminal, IsTransportTerminal } from ".";
import { CONNECTOR_TYPE } from "../../../models/project";

const SortConnectors = (connectors) => {
  const list = [];
  const isLocationNode = useSelector<RootState>((state) =>
    IsLocationNode(state.splitView.node)
  ) as boolean;

  connectors.forEach((conn) => {
    IsTransportTerminal(conn) && !isLocationNode && list.push(conn);
    IsLocationTerminal(conn) &&
      isLocationNode &&
      conn.type === CONNECTOR_TYPE.OUTPUT &&
      list.push(conn);
  });
  return list;
};

export default SortConnectors;
