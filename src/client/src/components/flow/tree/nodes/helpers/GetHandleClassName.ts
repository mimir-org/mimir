import { Connector } from "lib";

export const GetHandleClassName = (conn: Connector): string => {
  const className = "function-treeview-handler";

  // if (IsLocationRelation(conn)) {
  //   className = className + " locatedAt";
  // }

  // if (IsProductRelation(conn)) {
  //   className = className + " fulfilledBy";
  // }

  // if (IsPartOfRelation(conn)) {
  //   className = className + " partOf";
  // }

  return className + " partOf";
};
