import { CreateId } from "../helpers";
import { BlobData, LibItem, Node, User, NODE_KIND } from "../../../models";
import { Size } from "../../../compLibrary/size/Size";
import { GetDateNowUtc } from "../../../helpers";
import { Position } from "../../../models/project";

/**
 * Function to convert data to a Mimir Node.
 * @param data
 * @param position
 * @param projectId
 * @param icons
 * @param user
 * @returns a Node.
 */
const ConvertToNode = (data: LibItem, position: Position, projectId: string, icons: BlobData[], user: User) => {
  const now = GetDateNowUtc();

  const node = {
    id: CreateId(),
    rds: data.rds,
    projectId: projectId,
    name: data.name,
    label: data.name,
    positionX: position.x,
    positionY: position.y,
    positionBlockX: position.x,
    positionBlockY: position.y,
    connectors: data.connectors,
    attributes: data.attributes,
    simples: data.simples,
    aspect: data.aspect,
    statusId: data.statusId,
    version: data.version,
    masterProjectId: projectId,
    symbol: icons?.find((x) => x.id === data.symbolId)?.data,
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
