import { Color } from "../../../compLibrary";
import { Connector } from "../../../models";
import { IsProductTerminal, IsLocationTerminal } from "../../../components/flow/helpers";

const GetRelationColor = (conn: Connector) => {
  if (IsLocationTerminal(conn)) return Color.LocationHeader;
  if (IsProductTerminal(conn)) return Color.ProductHeader;
  else return Color.FunctionHeader;
};

export default GetRelationColor;
