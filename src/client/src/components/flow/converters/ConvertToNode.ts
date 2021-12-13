import { CreateId, GetDateNowUtc } from "../helpers";
import { Attribute, BlobData, Connector, LibItem, Node, User } from "../../../models";
import { Size } from "../../../compLibrary/size";

/**
 * Function to convert data to a Mimir Node.
 * @param data
 * @param position
 * @param projectId
 * @param icons
 * @param user
 * @returns a Node.
 */
const ConvertToNode = (data: LibItem, position, projectId: string, icons: BlobData[], user: User) => {
  const now = GetDateNowUtc();

  const node = new Node({
    id: CreateId(),
    rds: data.rds,
    projectId: projectId,
    name: data.name,
    label: data.name,
    positionX: position.x,
    positionY: position.y,
    positionBlockX: position.x,
    positionBlockY: position.y,
    connectors: data.connectors.map((c) => {
      c.attributes = c.attributes?.map((attr) => new Attribute(attr));
      return new Connector(c);
    }),
    attributes: data.attributes.map((attr) => new Attribute(attr)),
    simples: data.simples,
    aspect: data.aspect,
    statusId: data.statusId,
    version: data.version,
    masterProjectId: projectId,
    symbol: icons?.find((x) => x.id === data.symbolId)?.data,
    level: 0,
    cost: null,
    height: Size.Node_Height,
    width: Size.Node_Width,
    purpose: data.purpose,
    created: now,
    createdBy: user?.name,
    updated: now,
    updatedBy: user?.name,
    libraryTypeId: data.id,
  } as Node);

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
