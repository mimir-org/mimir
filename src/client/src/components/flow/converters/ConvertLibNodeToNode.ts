import { User } from "../../../models";
import { Size } from "../../../assets/size/Size";
import { GetDateNowUtc } from "../../../helpers";
import { Position } from "../../../models/project";
import { NodeLibCm, TerminalLibCm } from "@mimirorg/typelibrary-types";
import { CreateId } from "../helpers";
import { ConvertNodeAttributeLibCmToAttribute, ConvertTerminalLibCmToConnectors } from "./";
import { TextResources } from "../../../assets/text/TextResources";
import { ConvertTypeReference } from "./ConvertTypeReference";
import { Node } from "@mimirorg/modelbuilder-types";

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
  const now = GetDateNowUtc();
  const connectors = ConvertTerminalLibCmToConnectors(libNode.nodeTerminals, id, libNode.iri, allTerminals);
  const attributes = ConvertNodeAttributeLibCmToAttribute(libNode.attributes, id);
  const node: Node = {
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
    level: 0,
    height: Size.BLOCK_NODE_HEIGHT,
    width: Size.BLOCK_NODE_WIDTH,
    purposeString: libNode.purposeName,
    created: libNode.created,
    createdBy: libNode.createdBy,
    updated: now,
    updatedBy: user?.name,
    libraryTypeId: libNode.id,
    kind: TextResources.KIND_NODE,
    hidden: false,
    blockHidden: false,
    parentNodeId: parentNode.id,
    typeReferences: ConvertTypeReference(libNode.typeReferences),
    iri: null,
    domain: null,
    description: null,
    isLocked: false,
    isLockedStatusBy: null,
    isLockedStatusDate: null,
    order: 0,
    isRoot: false,
    masterProjectIri: null,
    projectIri: null,
    selected: false,
    blockSelected: false,
    isOffPageTarget: false,
    isOffPageRequired: false,
  };
  return node;
};

export default ConvertLibNodeToNode;
