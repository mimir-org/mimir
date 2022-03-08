import { IsPartOf } from ".";
import { Connector } from "../../../models";

const IsPartOfConnection = (sourceConn: Connector, targetConn: Connector) => {
  return IsPartOf(sourceConn) && IsPartOf(targetConn);
};

export default IsPartOfConnection;
