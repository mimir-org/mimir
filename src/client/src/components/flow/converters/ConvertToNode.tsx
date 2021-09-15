import { CreateId } from "../helpers/common";
import { BlobData, LibItem, Node } from "../../../models";

const ConvertToNode = (
  data: LibItem,
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
    composites: data.composites,
    aspect: data.aspect,
    statusId: data.statusId,
    version: data.version,
    masterProjectId: projectId,
    symbol: icons?.find((x) => x.id === data.symbolId)?.data,
    level: 0,
  } as Node;
};

export default ConvertToNode;
