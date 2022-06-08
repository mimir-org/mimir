import { IsOffPage } from "../../../../helpers/Aspects";
import { Node, Connector } from "@mimirorg/modelbuilder-types";
import { EDGE_TYPE, EdgeType } from "../../../../models/project";
import { IsTerminal, IsLocationRelation, IsProductRelation, IsPartOfRelation } from "../../helpers/Connectors";

const GetBlockEdgeType = (connector: Connector, sourceNode: Node, targetNode: Node): EdgeType => {
  if (IsOffPage(sourceNode) || IsOffPage(targetNode)) return EDGE_TYPE.BLOCK_OFFPAGE as EdgeType;
  if (IsTerminal(connector)) return EDGE_TYPE.BLOCK_TRANSPORT as EdgeType;
  // if (IsLocationRelation(connector) || IsProductRelation(connector)) return EDGE_TYPE.BLOCK_RELATION as EdgeType;
  // if (IsPartOfRelation(connector)) return EDGE_TYPE.BLOCK_PARTOF as EdgeType;
  // TODO: fix
};

export default GetBlockEdgeType;
