import { Connector } from "@mimirorg/modelbuilder-types";
import { EDGE_TYPE, EdgeType } from "../../../../models/project";
import { IsTerminal } from "../../../../services";
import { IsLocationRelation, IsProductRelation, IsPartOfRelation } from "../../helpers/Connectors";

const GetBlockEdgeType = (connector: Connector): EdgeType => {
  if (IsTerminal(connector)) return EDGE_TYPE.BLOCK_TRANSPORT as EdgeType;
  if (IsLocationRelation(connector) || IsProductRelation(connector)) return EDGE_TYPE.BLOCK_RELATION as EdgeType;
  if (IsPartOfRelation(connector)) return EDGE_TYPE.BLOCK_PARTOF as EdgeType;
};

export default GetBlockEdgeType;
