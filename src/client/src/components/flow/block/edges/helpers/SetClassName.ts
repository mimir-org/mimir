import { Connector } from "../../../../../models";
import { IsFulfilledByTerminal, IsFunction, IsLocationTerminal, IsProduct } from "../../../helpers";

const SetClassName = (data: any): string => {
  let defaultClassName = "react-flow__edge-path ";
  const sourceConn = data.source.connectors?.find((x: { id: any }) => x.id === data.edge.fromConnector.id) as Connector;

  if (IsLocationTerminal(sourceConn)) defaultClassName += "has-location";
  else if (IsFulfilledByTerminal(sourceConn)) defaultClassName += "fulfilled-by";
  else if (IsProduct(data.source)) defaultClassName += "-product";
  else if (IsFunction(data.source)) defaultClassName += "-function";
  else defaultClassName += "";

  return defaultClassName;
};

export default SetClassName;
