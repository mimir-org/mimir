import { Connector } from "../../../../../models";
import { IsProductTerminal, IsFunction, IsLocationTerminal, IsProduct } from "../../../helpers";

const SetClassName = (data: any): string => {
  let defaultClassName = "react-flow__edge-path ";
  const sourceConn = data.source.connectors?.find((x: Connector) => x.id === data.edge.fromConnector.id) as Connector;

  if (IsLocationTerminal(sourceConn)) defaultClassName += "has-location";
  else if (IsProductTerminal(sourceConn)) defaultClassName += "fulfilled-by";
  if (IsProduct(data.source)) defaultClassName += "-product";
  else if (IsFunction(data.source)) defaultClassName += "-function";

  return defaultClassName;
};

export default SetClassName;
