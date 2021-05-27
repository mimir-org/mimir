import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { RELATION_TYPE } from "../../../models/project";
import { IsLocationNode } from ".";

const SortConnectors = (connectors) => {
  const list = [];
  const isLocationNode = useSelector<RootState>((state) =>
    IsLocationNode(state.splitView.node)
  ) as boolean;

  connectors.forEach((conn) => {
    conn.relationType === RELATION_TYPE.Transport &&
      !isLocationNode &&
      list.push(conn);

    conn.relationType === RELATION_TYPE.HasLocation &&
      isLocationNode &&
      list.push(conn);
  });
  return list;
};

export default SortConnectors;
