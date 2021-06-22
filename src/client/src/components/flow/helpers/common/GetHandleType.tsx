import { Position, HandleType } from "react-flow-renderer";
import { Connector } from "../../../../models";
import IsInputConnector from "../common/IsInputConnector";
import {
  IsFulfilledByTerminal,
  IsLocationTerminal,
  IsPartOfTerminal,
  IsTransportTerminal,
} from "../common";

const GetHandleType = (conn: Connector): [HandleType, Position] => {
  if (IsInputConnector(conn) && IsPartOfTerminal(conn))
    return ["target", Position.Top];

  if (!IsInputConnector(conn) && IsPartOfTerminal(conn))
    return ["source", Position.Bottom];

  if (IsInputConnector(conn) && IsTransportTerminal(conn))
    return ["target", Position.Left];

  if (!IsInputConnector(conn) && IsTransportTerminal(conn))
    return ["source", Position.Right];

  if (
    IsInputConnector(conn) &&
    (IsLocationTerminal(conn) || IsFulfilledByTerminal(conn))
  )
    return ["target", Position.Left];

  if (
    !IsInputConnector(conn) &&
    (IsLocationTerminal(conn) || IsFulfilledByTerminal(conn))
  )
    return ["source", Position.Right];
};

export default GetHandleType;
