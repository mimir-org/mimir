import {
  Node,
  Connector,
  NODE_TYPE,
  RELATION_TYPE,
} from "../../../../models/project";

const ValidateEdge = (
  fromNode: Node,
  toNode: Node,
  splitViewNode: Node,
  fromConnector: Connector,
  toConnector: Connector,
  splitView: boolean
): boolean => {
  // TODO: Refactor..
  if (
    fromNode.type === NODE_TYPE.PRODUCT ||
    toNode.type === NODE_TYPE.PRODUCT ||
    fromNode.type === NODE_TYPE.ASPECT_LOCATION ||
    fromNode.type === NODE_TYPE.ASPECT_FUNCTION ||
    fromNode.type === NODE_TYPE.ASPECT_PRODUCT ||
    fromNode.type === NODE_TYPE.OFF_PAGE ||
    toNode.type === NODE_TYPE.OFF_PAGE
  ) {
    return false;
  }
  if (splitView) {
    if (
      fromNode.type === NODE_TYPE.FUNCTION &&
      toNode.type === NODE_TYPE.LOCATION &&
      fromConnector.relationType === RELATION_TYPE.HasLocation &&
      toConnector.relationType === RELATION_TYPE.HasLocation &&
      splitViewNode?.type === NODE_TYPE.LOCATION
    ) {
      return true;
    }
    if (
      !splitViewNode &&
      fromNode.type === NODE_TYPE.FUNCTION &&
      toNode.type === NODE_TYPE.FUNCTION
    ) {
      return true;
    }
  }

  if (!splitView) {
    if (
      fromNode.type === NODE_TYPE.LOCATION &&
      toNode.type === NODE_TYPE.LOCATION
    ) {
      return false;
    }
    if (
      fromNode?.type === NODE_TYPE.FUNCTION &&
      toNode?.type !== NODE_TYPE.LOCATION
    ) {
      return true;
    }
    if (
      fromNode?.type === NODE_TYPE.FUNCTION &&
      toNode.type === NODE_TYPE.LOCATION
    ) {
      return false;
    }
    if (
      fromNode.type === NODE_TYPE.FUNCTION &&
      splitViewNode.type === NODE_TYPE.LOCATION
    ) {
      return false;
    }
  }
  return false;
};

export default ValidateEdge;
