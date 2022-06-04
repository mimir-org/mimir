import { Node, User } from "../../../models";
import { Size } from "../../../assets/size/Size";
import { GetDateNowUtc } from "../../../helpers";
import { Position } from "../../../models/project";
import { NodeLibCm } from "@mimirorg/typelibrary-types";

/**
 * Function to convert data to a Mimir Node.
 * @param data
 * @param treePosition
 * @param parentNode
 * @param blockPosition
 * @param projectId
 * @param user
 * @returns a Node.
 */
const ConvertDataToNode = (
  data: NodeLibCm,
  treePosition: Position,
  parentNode: Node,
  blockPosition: Position,
  projectId: string,
  user: User
) => {
  const now = GetDateNowUtc();

  const node = {
    id: data.id,
    rds: data.rdsCode,
    projectId: projectId,
    name: data.name,
    label: data.name,
    positionX: treePosition.x,
    positionY: treePosition.y,
    positionBlockX: blockPosition.x,
    positionBlockY: blockPosition.y,
    connectors: [],
    attributes: [],
    simples: [],
    aspect: data.aspect,
    statusId: "",
    version: data.version,
    masterProjectId: projectId,
    symbol: data.symbol,
    level: 0,
    height: Size.BLOCK_NODE_HEIGHT, // Only used in BlockView
    width: Size.BLOCK_NODE_WIDTH, // Only used in BlockView
    purpose: data.purposeName,
    created: data.created,
    createdBy: data.createdBy,
    updated: now,
    updatedBy: user?.name,
    libraryTypeId: data.id,
    kind: data.kind,
    hidden: false,
    blockHidden: false,
    parentNodeId: parentNode.id,
  } as Node;

  // if (node.connectors) {
  //   node.connectors.forEach((connector) => {
  //     const connectorId = CreateId();
  //     connector.id = connectorId;
  //     connector.nodeId = node.id;

  //     if (connector.attributes) {
  //       connector.attributes.forEach((attribute) => {
  //         attribute.id = CreateId();
  //         attribute.terminalId = connectorId;
  //       });
  //     }
  //   });
  // }

  // if (node.attributes) {
  //   node.attributes.forEach((attribute) => {
  //     attribute.id = CreateId();
  //     attribute.nodeId = node.id;
  //   });
  // }

  // if (node.simples) {
  //   node.simples.forEach((simple) => {
  //     const simpleId = CreateId();
  //     simple.id = simpleId;
  //     simple.nodeId = node.id;

  //     if (simple.attributes) {
  //       simple.attributes.forEach((attribute) => {
  //         attribute.id = CreateId();
  //         attribute.simpleId = simpleId;
  //       });
  //     }
  //   });
  // }

  return node;
};

export default ConvertDataToNode;
