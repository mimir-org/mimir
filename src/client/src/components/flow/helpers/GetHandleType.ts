import {
  Connector,
  CONNECTOR_TYPE,
  RELATION_TYPE,
} from "../../../models/project";
import { Position, HandleType } from "react-flow-renderer";

const GetHandleType = (connector: Connector): [HandleType, Position] => {
  if (
    connector.type === CONNECTOR_TYPE.OUTPUT &&
    connector.relationType === RELATION_TYPE.Relation
  )
    return ["source", Position.Right];

  if (
    connector.type === CONNECTOR_TYPE.OUTPUT &&
    connector.relationType === RELATION_TYPE.Transport
  )
    return ["source", Position.Right];

  if (
    connector.type === CONNECTOR_TYPE.INPUT &&
    connector.relationType === RELATION_TYPE.Relation
  )
    return ["target", Position.Left];

  if (
    connector.type === CONNECTOR_TYPE.INPUT &&
    connector.relationType === RELATION_TYPE.Transport
  )
    return ["target", Position.Left];

  if (
    connector.type === CONNECTOR_TYPE.INPUT &&
    connector.relationType === RELATION_TYPE.PartOf
  )
    return ["target", Position.Top];

  if (
    connector.type === CONNECTOR_TYPE.OUTPUT &&
    connector.relationType === RELATION_TYPE.PartOf
  )
    return ["source", Position.Bottom];

  return ["source", Position.Bottom];
};

export default GetHandleType;