import { Connector } from "@mimirorg/modelbuilder-types";
import { EDGE_TYPE, EdgeType } from "../../../../lib/models/project";
import { IsTerminal } from "../../../../services";
import { IsPartOfRelation, IsLocationRelation, IsProductRelation } from "../../helpers/Connectors";

const GetTreeEdgeType = (conn: Connector): EdgeType => {
  if (IsPartOfRelation(conn)) return EDGE_TYPE.TREE_PARTOF as EdgeType;
  if (IsLocationRelation(conn) || IsProductRelation(conn)) return EDGE_TYPE.TREE_RELATION as EdgeType;
  if (IsTerminal(conn)) return EDGE_TYPE.TREE_TRANSPORT as EdgeType;
};

export default GetTreeEdgeType;
