import { Connector, RelationType, Aspect } from "../../../../models";

const GetClassName = (data: any): string => {
  let defaultClassName = "react-flow__edge-path ";

  const fromConn = data.source.connectors?.find((x: { id: any }) => x.id === data.edge.fromConnector.id) as Connector;

  switch (fromConn?.relationType) {
    case RelationType.HasLocation:
      defaultClassName += "has-location";
      break;
    case RelationType.FulfilledBy:
      defaultClassName += "fulfilled-by";
      break;
    default:
      defaultClassName += "";
  }

  switch (data.source.aspect) {
    case Aspect.Product:
      defaultClassName += "-product";
      break;
    case Aspect.Function:
      defaultClassName += "-function";
      break;
    default:
      defaultClassName += "";
  }

  return defaultClassName;
};

export default GetClassName;
