import { Connector, ConnectorPartOf, ConnectorTerminal } from "lib";
import { EDGE_TYPE, EdgeType } from "../../../../models/project";
import { ConnectorHasLocation, ConnectorFulfilledBy } from "../../../../lib/classes/Connector";

const GetBlockEdgeType = (connector: Connector): EdgeType => {
  if (connector instanceof ConnectorTerminal) return EDGE_TYPE.BLOCK_TRANSPORT as EdgeType;
  if (connector instanceof ConnectorHasLocation || connector instanceof ConnectorFulfilledBy)
    return EDGE_TYPE.BLOCK_RELATION as EdgeType;
  if (connector instanceof ConnectorPartOf) return EDGE_TYPE.BLOCK_PARTOF as EdgeType;
};

export default GetBlockEdgeType;
