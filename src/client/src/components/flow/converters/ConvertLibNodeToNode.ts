import { Size } from "../../../assets/size/Size";
import { NodeLibCm, TerminalLibCm } from "@mimirorg/typelibrary-types";
import { CreateId } from "../helpers";
import { ConvertNodeAttributeLibCmToAttribute, ConvertTerminalLibCmToConnectors } from "./";
import { TextResources } from "../../../assets/text/TextResources";
import { ConvertTypeReference } from "./ConvertTypeReference";
import { Node, NodeType } from "@mimirorg/modelbuilder-types";
import { MimirNode } from "../../../lib/classes/MimirNode";
import { Position } from "../../../lib/types/Project";
import { User } from "../../../lib/types/User";

/**
 * Function to convert a libNode dropped from the Library to a Mimir Node.
 * The libNode is of the type NodeLibCm.
 * @param libNode
 * @param parentNode
 * @param treePosition
 * @param blockPosition
 * @param projectId
 * @param user
 * @param allTerminals
 * @returns a Node.
 */
const ConvertLibNodeToNode = (
  libNode: NodeLibCm,
  parentNode: Node,
  treePosition: Position,
  blockPosition: Position,
  projectId: string,
  user: User,
  allTerminals: TerminalLibCm[]
): Node => {
  const id = CreateId();
  const connectors = ConvertTerminalLibCmToConnectors(libNode.nodeTerminals, id, libNode.iri, allTerminals, libNode.aspect);
  const attributes = ConvertNodeAttributeLibCmToAttribute(libNode.attributes, id);
  const node = new MimirNode({
    id,
    rds: libNode.rdsCode,
    projectId,
    name: libNode.name,
    label: libNode.name,
    positionX: treePosition.x,
    positionY: treePosition.y,
    positionBlockX: blockPosition.x,
    positionBlockY: blockPosition.y,
    connectors,
    attributes,
    aspect: libNode.aspect,
    version: libNode.version,
    masterProjectId: projectId,
    symbol: libNode.symbol,
    height: Size.BLOCK_NODE_HEIGHT,
    width: Size.BLOCK_NODE_WIDTH,
    purposeString: libNode.purposeName,
    created: libNode.created,
    createdBy: libNode.createdBy,
    updatedBy: user?.name,
    libraryTypeId: libNode.id,
    kind: TextResources.KIND_NODE,
    typeReferences: ConvertTypeReference(libNode.typeReferences),
    nodeType: NodeType.Aspect,
  });
  return node;
};

export default ConvertLibNodeToNode;
