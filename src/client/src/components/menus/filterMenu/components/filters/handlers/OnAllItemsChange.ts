import { Dispatch } from "redux";
import { Connector, ConnectorVisibility, Edge } from "../../../../../../models";
import { changeActiveConnector, setEdgeVisibility } from "../../../../../../redux/store/project/actions";
import { IsLocationTerminal, IsPartOfTerminal, IsProductTerminal, IsTransport } from "../../../../../flow/helpers/Connectors";

export const OnAllRelationsChange = (edges: Edge[], dispatch: Dispatch) => {
  const hidden = edges.some((x) => (IsLocationTerminal(x.fromConnector) || IsProductTerminal(x.fromConnector)) && x.hidden);

  edges?.forEach((e) => {
    if (IsLocationTerminal(e.fromConnector) || IsProductTerminal(e.fromConnector)) dispatch(setEdgeVisibility(e.id, !hidden));
  });
};

export const OnAllPartOfChange = (edges: Edge[], dispatch: Dispatch) => {
  const hidden = edges.some((x) => IsPartOfTerminal(x.fromConnector) && x.hidden);

  edges?.forEach((e) => {
    if (IsPartOfTerminal(e.fromConnector)) dispatch(setEdgeVisibility(e.id, !hidden));
  });
};

export const OnAllTransportsChange = (edges: Edge[], dispatch: Dispatch) => {
  const hidden = edges.some((x) => IsTransport(x.fromConnector) && x.hidden);

  edges?.forEach((e) => {
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
  edges?.forEach((edge) => {
    if (IsTransport(edge.fromConnector)) {
      if (edge.fromConnector.terminalCategoryId === terminalCategoryId) dispatch(setEdgeVisibility(edge.id, isChecked));
    }
  });
};
