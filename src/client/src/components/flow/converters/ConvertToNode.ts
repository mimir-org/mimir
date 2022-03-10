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
    cost: null,
    height: Size.NODE_HEIGHT,
    width: Size.NODE_WIDTH,
    purpose: data.purpose,
    created: now,
    createdBy: user?.name,
    updated: now,
    updatedBy: user?.name,
    libraryTypeId: data.id,
    kind: NODE_KIND,
  } as Node;

  if (node.connectors) {
    node.connectors.forEach((x) => {
      x.id = CreateId();
      if (x.attributes) {
        x.attributes.forEach((y) => {
          y.id = CreateId();
        });
      }
    });
  }

  if (node.attributes) {
    node.attributes.forEach((x) => {
      x.id = CreateId();
    });
  }

  if (node.simples) {
    node.simples.forEach((x) => {
      x.id = CreateId();
      if (x.attributes) {
        x.attributes.forEach((y) => {
          y.id = CreateId();
        });
      }
    });
  }

  return node;
};

export default ConvertToNode;
