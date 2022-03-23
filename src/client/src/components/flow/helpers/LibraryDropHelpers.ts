import CreateId from "./CreateId";
import { Attribute, Connector, ConnectorVisibility, Node, Project, Simple } from "../../../models";
import { IsLocation, IsProduct } from "../../../helpers";
import { IsProductTerminal, IsLocationTerminal, IsOutputTerminal, IsInputTerminal } from ".";
import { LibraryState } from "../../../redux/store/library/types";
import { Dispatch } from "redux";
import { IsPartOf } from "./IsPartOf";
import { ConvertToEdge } from "../converters";
import { SetSiblingIndexOnNodeDrop } from "./SetSiblingRDS";
import { createEdge } from "../../../redux/store/project/actions";

export function InitSimple(simple: Simple, targetNode: Node) {
  const simpleId = CreateId();
  simple.id = simpleId;
  simple.nodeId = targetNode.id;
  simple.attributes.forEach((a) => {
    a.simpleId = simpleId;
  });
}

export function InitConnector(connector: Connector, targetNode: Node) {
  connector.id = CreateId();
  connector.nodeId = targetNode.id;
  connector.attributes?.forEach((a) => {
    a.id = CreateId();
  });

  connector.connectorVisibility = InitConnectorVisibility(connector, targetNode);
}

export function InitNodeAttributes(attribute: Attribute, targetNode: Node) {
  attribute.nodeId = targetNode.id;
  attribute.id = CreateId();
}

export function InitConnectorVisibility(connector: Connector, targetNode: Node) {
  const isLocationConn = IsLocation(targetNode) && IsLocationTerminal(connector);
  const isProductConn = IsProduct(targetNode) && IsProductTerminal(connector);

  if (!isLocationConn && !isProductConn) return ConnectorVisibility.None;
  if (IsInputTerminal(connector)) return ConnectorVisibility.InputVisible;
  if (IsOutputTerminal(connector)) return ConnectorVisibility.OutputVisible;
}

export function HandleCreatePartOfEdge(
  sourceNode: Node,
  targetNode: Node,
  project: Project,
  library: LibraryState,
  dispatch: Dispatch
) {
  targetNode.level = sourceNode.level + 1;
  const sourceConn = sourceNode.connectors?.find((x) => IsPartOf(x) && IsOutputTerminal(x));
  const targetConn = targetNode.connectors?.find((x) => IsPartOf(x) && IsInputTerminal(x));
  const partofEdge = ConvertToEdge(CreateId(), sourceConn, targetConn, sourceNode, targetNode, project.id, library);

  SetSiblingIndexOnNodeDrop(targetNode, project, sourceNode);
  dispatch(createEdge(partofEdge));
}
