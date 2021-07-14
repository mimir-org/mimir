import { CreateId } from "../helpers/common";
import { BlobData, LibraryNodeItem, Node } from "../../../models";

const ConvertToNode = (
  data: LibraryNodeItem,
  position,
  projectId: string,
  icons: BlobData[]
) => {
  return {
    id: CreateId(),
    rds: data.rds,
    semanticReference: data.semanticReference,
    name: data.name,
    label: data.name,
    positionX: position.x,
    positionY: position.y,
    positionBlockX: position.x,
    positionBlockY: position.y,
    connectors: data.connectors,
    attributes: data.attributes,
    aspect: data.aspect,
    statusId: data.statusId,
    version: data.version,
    masterProjectId: projectId,
    symbolId: data.symbolId,
    symbol: icons?.find((x) => x.id === data.symbolId),
    level: 0,
  } as Node;
};

export default ConvertToNode;
