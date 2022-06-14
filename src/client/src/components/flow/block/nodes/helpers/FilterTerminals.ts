import { IsFunction, IsLocation, IsProduct } from "../../../../../helpers/Aspects";
import { Terminals } from "../blockParentNode/BlockParentNode";
import { Connector, Node } from "@mimirorg/modelbuilder-types";
import {
  IsBidirectionalTerminal,
  IsInputConnector,
  IsLocationRelation,
  IsOutputConnector,
  IsPartOfRelation,
  IsProductRelation,
  IsTerminal,
} from "../../../helpers/Connectors";

/**
 * Component to filter the terminals displayed on the nodes in BlockView.
 * Different node types allow different terminal types.
 * @param connectors
 * @param selectedBlockNode
 * @param secondaryNode
 * @returns two filtered lists of connectors sorted by type, name and input/output.
 */
export const FilterTerminals = (connectors: Connector[], selectedBlockNode: Node, secondaryNode: Node) => {
  const sortedConnectors = connectors
    ?.filter((c) => FilterTerminal(selectedBlockNode, secondaryNode, c))
    ?.sort((a, b) => a.type - b.type || a.name.localeCompare(b.name));

  const inputs = sortedConnectors?.filter((t) => IsInputConnector(t) || IsBidirectionalTerminal(t)) ?? [];
  const outputs = sortedConnectors?.filter((t) => IsOutputConnector(t) || IsBidirectionalTerminal(t)) ?? [];

  return { inputs, outputs } as Terminals;
};

function FilterTerminal(selectedNode: Node, secondaryNode: Node, connector: Connector) {
  if (secondaryNode != null) return FilterSplitViewTerminal(selectedNode, secondaryNode, connector);
  if (IsLocation(selectedNode)) return IsLocationRelation(connector);
  if (IsProduct(selectedNode)) return IsTerminal(connector) || IsPartOfRelation(connector);
  return IsTerminal(connector);
}

function FilterSplitViewTerminal(selectedNode: Node, secondaryNode: Node, connector: Connector) {
  if (IsProduct(selectedNode)) {
    if (IsFunction(secondaryNode)) return IsProductRelation(connector);
    if (IsLocation(secondaryNode)) return IsLocationRelation(connector);
    if (IsProduct(secondaryNode)) return IsTerminal(connector);
  }

  if (IsFunction(selectedNode)) {
    if (IsFunction(secondaryNode)) return IsTerminal(connector);
    if (IsLocation(secondaryNode)) return IsLocationRelation(connector);
    if (IsProduct(secondaryNode)) return IsProductRelation(connector);
  }

  return IsLocationRelation(connector);
}
