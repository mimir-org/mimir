import { RELATION_TYPE } from "../../../models/project";

const SortConnectorList = (connectors) => {
  const list = [];

  connectors.forEach((conn) => {
    if (conn.relationType === RELATION_TYPE.Transport) {
      list.push(conn);
    }
  });

  return list;
};

export default SortConnectorList;
