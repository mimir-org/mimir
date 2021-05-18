import { useSelector } from "react-redux";
import { NODE_TYPE, RELATION_TYPE } from "../../../models/project";
import { RootState } from "../../../redux/store";

const SortConnectorList = (connectors) => {
  const list = [];
  const isLocationNode = useSelector<RootState>(
    (state) => state.splitView.node?.type === NODE_TYPE.LOCATION
  ) as boolean;

  connectors.forEach((conn) => {
    if (!isLocationNode) {
      if (conn.relationType === RELATION_TYPE.Transport) {
        list.push(conn);
      }
    } else {
      if (
        conn.relationType === RELATION_TYPE.HasLocation ||
        conn.relationType === RELATION_TYPE.PartOf
      ) {
        list.push(conn);
      }
    }
  });

  return list;
};

export default SortConnectorList;
