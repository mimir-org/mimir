import { Connector } from "@mimirorg/modelbuilder-types";
import { IsLocationRelation, IsProductRelation, IsPartOfRelation } from "../../../helpers/Connectors";

export const GetHandleClassName = (conn: Connector): string => {
  let className = "function-treeview-handler";

  if (IsLocationRelation(conn)) {
    className = className + " locatedAt";
  }

  if (IsProductRelation(conn)) {
    className = className + " fulfilledBy";
  }

  if (IsPartOfRelation(conn)) {
    className = className + " partOf";
  }

  return className;
};
