import { Position, HandleType } from "react-flow-renderer";
import { Connector, CONNECTOR_TYPE } from "../../../../models/project";
import {
  IsFulfilledByTerminal,
  IsLocationTerminal,
  IsPartOfTerminal,
  IsTransportTerminal,
} from ".";

const GetHandleType = (connector: Connector): [HandleType, Position] => {
  if (
    connector.type === CONNECTOR_TYPE.OUTPUT &&
    (IsLocationTerminal(connector) || IsFulfilledByTerminal(connector))
  )
    return ["source", Position.Right];

  if (
    connector.type === CONNECTOR_TYPE.OUTPUT &&
    IsTransportTerminal(connector)
  )
    return ["source", Position.Right];

  if (
    connector.type === CONNECTOR_TYPE.INPUT &&
    (IsLocationTerminal(connector) || IsFulfilledByTerminal(connector))
  )
    return ["target", Position.Left];

  if (connector.type === CONNECTOR_TYPE.INPUT && IsTransportTerminal(connector))
    return ["target", Position.Left];

  if (connector.type === CONNECTOR_TYPE.INPUT && IsPartOfTerminal(connector))
    return ["target", Position.Top];

  if (connector.type === CONNECTOR_TYPE.OUTPUT && IsPartOfTerminal(connector))
    return ["source", Position.Bottom];

  return ["source", Position.Bottom];
};

export default GetHandleType;
