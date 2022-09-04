import { Edge, Connector, ConnectorVisibility } from "@mimirorg/modelbuilder-types";
import { Dispatch } from "redux";
import { changeActiveConnector, setEdgeVisibility } from "../../../../../../redux/store/project/actions";
import { IsLocationRelation, IsPartOfRelation, IsProductRelation, IsTerminal } from "../../../../../flow/helpers/Connectors";

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
  const hidden = edges.some((e) => IsTerminal(e.fromConnector) && e.hidden);

  edges.forEach((e) => {
    if (IsTerminal(e.fromConnector)) dispatch(setEdgeVisibility(e.id, !hidden));
  });
};

export const OnAllTerminalsChange = (terminals: Connector[], dispatch: Dispatch, visible: boolean) => {
  terminals.forEach((c) => {
    let connectorVisibility = ConnectorVisibility.None;
    if (!visible) connectorVisibility = c.connectorVisibility;

    dispatch(changeActiveConnector(c.nodeId, c.id, connectorVisibility));
  });
};

export const OnTerminalCategoryChange = (edges: Edge[], terminalCategory: string, isChecked: boolean, dispatch: Dispatch) => {
  edges.forEach((edge) => {
    if (!IsTerminal(edge.fromConnector)) return;
    if (edge.fromConnector.terminalCategory === terminalCategory) dispatch(setEdgeVisibility(edge.id, isChecked));
  });
};
