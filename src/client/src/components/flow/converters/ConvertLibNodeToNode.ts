import { User } from "../../../models";
import { Node } from "@mimirorg/modelbuilder-types";
import { Size } from "../../../assets/size/Size";
import { GetDateNowUtc } from "../../../helpers";
import { Position } from "../../../models/project";
import { NodeLibCm, TerminalLibCm } from "@mimirorg/typelibrary-types";
import { CreateId } from "../helpers";
import { ConvertSimpleLibCmToSimple, ConvertNodeAttributeLibCmToAttribute, ConvertTerminalLibCmToConnectors } from "./";
import { TextResources } from "../../../assets/text/TextResources";

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
) => {
  const id = CreateId();
  const now = GetDateNowUtc();
  const connectors = ConvertTerminalLibCmToConnectors(libNode.nodeTerminals, allTerminals, id, libNode.iri);
  const attributes = ConvertNodeAttributeLibCmToAttribute(libNode.attributes, id, libNode.iri);
  const simples = ConvertSimpleLibCmToSimple(libNode.simples, id, libNode.iri);

  return {
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
    simples,
    aspect: libNode.aspect,
    statusId: "",
    version: libNode.version,
    masterProjectId: projectId,
    symbol: libNode.symbol,
    level: 0,
    height: Size.BLOCK_NODE_HEIGHT, // Only used in BlockView
    width: Size.BLOCK_NODE_WIDTH, // Only used in BlockView
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
  } as Node;
};

export default ConvertLibNodeToNode;
