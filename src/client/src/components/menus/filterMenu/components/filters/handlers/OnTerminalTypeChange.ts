import { Dispatch } from "redux";
import { Edge } from "../../../../../../models";
import { setEdgeVisibility } from "../../../../../../redux/store/project/actions";
import { IsTransport } from "../../../../../flow/helpers/Connectors";

export const OnTerminalTypeChange = (
  edges: Edge[],
  terminalCategoryId: string,
  terminalTypeId: string,
  isChecked: boolean,
  dispatch: Dispatch
) => {
  edges?.forEach((edge) => {
    if (IsTransport(edge.fromConnector)) {
      if (edge.fromConnector.terminalCategory === terminalCategoryId && edge.fromConnector.terminalTypeId === terminalTypeId)
        dispatch(setEdgeVisibility(edge.id, isChecked));
    }
  });
};
