import { Node, Connector, Relation, ConnectorDirection } from "@mimirorg/modelbuilder-types";
import { TextResources } from "../../../../../assets/text/TextResources";
import { IsRelation } from "../../../../../services";
import { IsPartOfRelation } from "../../../helpers/Connectors";

/**
 * Validator for an edge in three-view.
 * If an edge should be created is defined by the connctor type.
 * @param sourceNode
 * @param targetNode
 * @param sourceConn
 * @param targetConn
 * @returns a boolean value.
 */
const ValidateFlowTreeEdge = (
  sourceNode: Node,
  targetNode: Node,
  sourceConn: Connector,
  targetConn: Connector
): [status: boolean, message: string] => {
  if (sourceNode == null || targetNode == null || sourceConn == null || targetConn == null)
    return [false, TextResources.VALIDATION_IMPOSSIBLE_CONNECTION];
  if (!IsRelation(sourceConn) || !IsRelation(targetConn)) return [false, TextResources.VALIDATION_IMPOSSIBLE_CONNECTION];

  const from = sourceConn as Relation;
  const to = targetConn as Relation;

  if (from.relationType !== to.relationType) return [false, TextResources.VALIDATION_TERMINALS];
  if (from.type !== ConnectorDirection.Output || to.type !== ConnectorDirection.Input)
    return [false, TextResources.VALIDATION_DIRECTION];

  if (IsPartOfRelation(sourceConn) && sourceNode.aspect !== targetNode.aspect) return [false, TextResources.VALIDATION_ASPECT];

  return [true, ""];
};

export default ValidateFlowTreeEdge;
