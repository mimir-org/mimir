import { IsOffPage } from "../../../../helpers/Aspects";
import { Connector, Node } from "../../../../models";
import { EDGE_TYPE, EdgeType } from "../../../../models/project";
import { IsTransport, IsLocationTerminal, IsProductTerminal, IsPartOfTerminal } from "../../helpers/Connectors";

const GetBlockEdgeType = (connector: Connector, sourceNode: Node, targetNode: Node): EdgeType => {
  if (IsOffPage(sourceNode) || IsOffPage(targetNode)) return EDGE_TYPE.BLOCK_OFFPAGE as EdgeType;
  if (IsTransport(connector)) return EDGE_TYPE.BLOCK_TRANSPORT as EdgeType;
  if (IsLocationTerminal(connector) || IsProductTerminal(connector)) return EDGE_TYPE.BLOCK_RELATION as EdgeType;
  if (IsPartOfTerminal(connector)) return EDGE_TYPE.BLOCK_PARTOF as EdgeType;
};

export default GetBlockEdgeType;
