import CreateId from "./CreateId";
import { Connector, ConnectorVisibility, Node, Project } from "../../../models";
import { IsLocation, IsProduct } from "../../../helpers";
import { IsProductTerminal, IsLocationTerminal, IsOutputTerminal, IsInputTerminal } from ".";
import { LibraryState } from "../../../redux/store/library/types";
import { Dispatch } from "redux";
import { IsPartOf } from "./IsPartOf";
import { ConvertToEdge } from "../converters";
import { SetSiblingIndexOnNodeDrop } from "./SetSiblingRDS";
import { createEdge } from "../../../redux/store/project/actions";

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
