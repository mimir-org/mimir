import { Edge, Connector, ConnectorVisibility } from "@mimirorg/modelbuilder-types";
import { Dispatch } from "redux";
import { changeActiveConnector, setEdgeVisibility } from "../../../../../../redux/store/project/actions";
import { IsLocationRelation, IsPartOfRelation, IsProductRelation, IsTransport } from "../../../../../flow/helpers/Connectors";

export const OnAllRelationsChange = (edges: Edge[], dispatch: Dispatch) => {
  const hidden = edges.some((e) => (IsLocationRelation(e.fromConnector) || IsProductRelation(e.fromConnector)) && e.hidden);

  edges.forEach((e) => {
    if (IsLocationRelation(e.fromConnector) || IsProductRelation(e.fromConnector)) dispatch(setEdgeVisibility(e.id, !hidden));
  });
};

export const OnAllPartOfChange = (edges: Edge[], dispatch: Dispatch) => {
  const hidden = edges.some((e) => IsPartOfRelation(e.fromConnector) && e.hidden);

  edges.forEach((e) => {
    if (IsPartOfRelation(e.fromConnector)) dispatch(setEdgeVisibility(e.id, !hidden));
  });
};

export const OnAllTransportsChange = (edges: Edge[], dispatch: Dispatch) => {
  const hidden = edges.some((e) => IsTransport(e.fromConnector) && e.hidden);

  edges.forEach((e) => {
    if (IsTransport(e.fromConnector)) dispatch(setEdgeVisibility(e.id, !hidden));
  });
};

export const OnAllTerminalsChange = (terminals: Connector[], dispatch: Dispatch, visible: boolean) => {
  terminals.forEach((c) => {
    let connectorVisibility = ConnectorVisibility.None;
    if (!visible) connectorVisibility = c.connectorVisibility;

    dispatch(changeActiveConnector(c.nodeId, c.id, connectorVisibility));
  });
};

export const OnTerminalCategoryChange = (edges: Edge[], terminalCategoryId: string, isChecked: boolean, dispatch: Dispatch) => {
  edges.forEach((edge) => {
    if (IsTransport(edge.fromConnector)) {
      if (edge.fromConnector.terminalCategory === terminalCategoryId) dispatch(setEdgeVisibility(edge.id, isChecked));
    }
  });
};
