import { Connector, Edge } from "../../../../models";
import { changeActiveConnector, setEdgeVisibility } from "../../../../redux/store/project/actions";
import { IsLocationTerminal, IsPartOf, IsProductTerminal, IsTransport } from "../../../flow/helpers";

export const OnAllRelationsChange = (edges: Edge[], dispatch: any) => {
  const hidden = edges.some((x) => (IsLocationTerminal(x.fromConnector) || IsProductTerminal(x.fromConnector)) && x.isHidden);

  edges?.forEach((e) => {
    if (IsLocationTerminal(e.fromConnector) || IsProductTerminal(e.fromConnector)) dispatch(setEdgeVisibility(e, !hidden));
  });
};

export const OnAllPartOfChange = (edges: Edge[], dispatch: any) => {
  const hidden = edges.some((x) => IsPartOf(x.fromConnector) && x.isHidden);

  edges?.forEach((e) => {
    if (IsPartOf(e.fromConnector)) dispatch(setEdgeVisibility(e, !hidden));
  });
};

export const OnAllTransportsChange = (edges: Edge[], dispatch: any) => {
  const hidden = edges.some((x) => IsTransport(x.fromConnector) && x.isHidden);

  edges?.forEach((e) => {
    if (IsTransport(e.fromConnector)) dispatch(setEdgeVisibility(e, !hidden));
  });
};

export const OnAllTerminalsChange = (terminals: Connector[], dispatch: any, visible: boolean) => {
  terminals.forEach((c) => {
    dispatch(changeActiveConnector(c.nodeId, c.id, !visible, c.inputOrder, c.outputOrder));
  });
};

export const OnAllFluidsChange = (edges: Edge[], categoryId: string, isChecked: boolean, dispatch: any) => {
  edges?.forEach((edge) => {
    if (IsTransport(edge.fromConnector)) {
      if (edge.fromConnector.terminalCategoryId === categoryId) dispatch(setEdgeVisibility(edge, isChecked));
    }
  });
};
