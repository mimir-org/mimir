import { Color } from "../../../compLibrary";
import { Connector } from "../../../models";
import { IsFulfilledByTerminal, IsLocationTerminal } from "../../../components/flow/helpers";

const GetRelationColor = (conn: Connector) => {
  if (IsLocationTerminal(conn)) return Color.LocationHeader;
  if (IsFulfilledByTerminal(conn)) return Color.ProductHeader;
  else return Color.FunctionHeader;
};

export default GetRelationColor;
