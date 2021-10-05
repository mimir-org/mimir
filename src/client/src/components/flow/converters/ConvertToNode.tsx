import { CreateId, IsLocation } from "../helpers";
import { BlobData, LibItem, Node } from "../../../models";
import { Size } from "../../../compLibrary";

/**
 * Function to convert data to a Mimir Node.
 * @param data
 * @param position
 * @param projectId
 * @param icons
 * @returns a Node.
 */
const ConvertToNode = (data: LibItem, position, projectId: string, icons: BlobData[]) => {
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
    cost: null,
    height: null,
    length: IsLocation(data) ? Size.Node_Length : null,
    width: IsLocation(data) ? Size.Node_Width : null,
  } as Node;
};

export default ConvertToNode;
