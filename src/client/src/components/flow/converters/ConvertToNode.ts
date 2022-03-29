import { CreateId } from "../helpers";
import { BlobData, LibItem, Node, User, NODE_KIND } from "../../../models";
import { Size } from "../../../compLibrary/size";
import { GetDateNowUtc } from "../../../helpers";
import { Position } from "../../../models/project";

/**
 * Function to convert data to a Mimir Node.
 * @param data
 * @param treePosition
 * @param blockPosition
 * @param projectId
 * @param icons
 * @param user
 * @returns a Node.
 */
const ConvertToNode = (
  data: LibItem,
  treePosition: Position,
  blockPosition: Position,
  projectId: string,
  icons: BlobData[],
  user: User
) => {
  const now = GetDateNowUtc();
  const symbol = icons?.find((x) => x.id === data.symbolId)?.data;

  const node = {
    id: CreateId(),
    rds: data.rds,
    projectId: projectId,
    name: data.name,
    label: data.name,
    positionX: treePosition.x,
    positionY: treePosition.y,
    positionBlockX: blockPosition.x,
    positionBlockY: blockPosition.y,
    connectors: data.connectors,
    attributes: data.attributes,
    simples: data.simples,
    aspect: data.aspect,
    statusId: data.statusId,
    version: data.version,
    masterProjectId: projectId,
    symbol: symbol,
    level: 0,
    height: Size.BLOCK_NODE_HEIGHT, // Only used in BlockView
    width: Size.BLOCK_NODE_WIDTH, // Only used in BlockView
    purpose: data.purpose,
    created: now,
    createdBy: user?.name,
    updated: now,
    updatedBy: user?.name,
    libraryTypeId: data.id,
    kind: NODE_KIND,
  } as Node;

  if (node.connectors) {
    node.connectors.forEach((connector) => {
      const connectorId = CreateId();
      connector.id = connectorId;
      connector.nodeId = node.id;

      if (connector.attributes) {
        connector.attributes.forEach((attribute) => {
          attribute.id = CreateId();
          attribute.terminalId = connectorId;
        });
      }
    });
  }

  if (node.attributes) {
    node.attributes.forEach((attribute) => {
      attribute.id = CreateId();
      attribute.nodeId = node.id;
    });
  }

  if (node.simples) {
    node.simples.forEach((simple) => {
      const simpleId = CreateId();
      simple.id = simpleId;
      simple.nodeId = node.id;

      if (simple.attributes) {
        simple.attributes.forEach((attribute) => {
          attribute.id = CreateId();
          attribute.simpleId = simpleId;
        });
      }
    });
  }

  return node;
};

export default ConvertToNode;
