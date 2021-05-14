import { HandleType, Position } from "react-flow-renderer";
import {
  Connector,
  CONNECTOR_TYPE,
  RELATION_TYPE,
} from "../../../models/project";

const GetBlockHandleType = (
  connector: Connector
): [HandleType, Position, string] => {
  if (
    connector.type === CONNECTOR_TYPE.OUTPUT &&
    (connector.relationType === RELATION_TYPE.HasLocation ||
      connector.relationType === RELATION_TYPE.FulfilledBy)
  )
    return ["source", Position.Right, "blockView-handle-right"];

  if (
    connector.type === CONNECTOR_TYPE.OUTPUT &&
    connector.relationType === RELATION_TYPE.Transport
  )
    return ["source", Position.Right, "blockView-handle-right"];

  if (
    connector.type === CONNECTOR_TYPE.INPUT &&
    (connector.relationType === RELATION_TYPE.HasLocation ||
      connector.relationType === RELATION_TYPE.FulfilledBy)
  )
    return ["target", Position.Left, "blockView-handle-left"];

  if (
    connector.type === CONNECTOR_TYPE.INPUT &&
    connector.relationType === RELATION_TYPE.Transport
  )
    return ["target", Position.Left, "blockView-handle-left"];
};

export default GetBlockHandleType;
