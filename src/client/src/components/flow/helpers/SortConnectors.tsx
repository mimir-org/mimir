import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { NODE_TYPE, RELATION_TYPE } from "../../../models/project";

const SortConnectors = (connectors) => {
  const list = [];
  const isLocationNode = useSelector<RootState>(
    (state) => state.splitView.node?.type === NODE_TYPE.LOCATION
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
