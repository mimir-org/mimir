import { Connection, Connector } from "lib";
import { Dispatch } from "redux";
// import { changeActiveConnector, setEdgeVisibility } from "../../../../../../redux/store/project/actions";
// import { IsLocationRelation, IsPartOfRelation, IsProductRelation, IsTerminal } from "../../../../../flow/helpers/Connectors";

export const OnAllRelationsChange = (edges: Connection[], dispatch: Dispatch) => {
  // const hidden = edges.some((e) => (IsLocationRelation(e.fromConnector) || IsProductRelation(e.fromConnector)) && e.hidden);
  // edges.forEach((e) => {
  //   if (IsLocationRelation(e.fromConnector) || IsProductRelation(e.fromConnector)) dispatch(setEdgeVisibility(e.id, !hidden));
  // });
};

export const OnAllPartOfChange = (edges: Connection[], dispatch: Dispatch) => {
  // const hidden = edges.some((e) => IsPartOfRelation(e.fromConnector) && e.hidden);
  // edges.forEach((e) => {
  //   if (IsPartOfRelation(e.fromConnector)) dispatch(setEdgeVisibility(e.id, !hidden));
  // });
};

export const OnAllTransportsChange = (edges: Connection[], dispatch: Dispatch) => {
  // const hidden = edges.some((e) => IsTerminal(e.fromConnector) && e.hidden);
  // edges.forEach((e) => {
  //   if (IsTerminal(e.fromConnector)) dispatch(setEdgeVisibility(e.id, !hidden));
  // });
};

export const OnAllTerminalsChange = (terminals: Connector[], dispatch: Dispatch, visible: boolean) => {
  // terminals.forEach((c) => {
  //   let connectorVisibility = ConnectorVisibility.None;
  //   if (!visible) connectorVisibility = c.connectorVisibility;
  //   dispatch(changeActiveConnector(c.nodeId, c.id, connectorVisibility));
  // });
};

export const OnTerminalCategoryChange = (
  edges: Connection[],
  terminalParentTypeName: string,
  isChecked: boolean,
  dispatch: Dispatch
) => {
  // edges.forEach((edge) => {
  //   if (!IsTerminal(edge.fromConnector)) return;
  //   if (edge.fromConnector.terminalParentTypeName === terminalParentTypeName) dispatch(setEdgeVisibility(edge.id, isChecked));
  // });
};
