import { Dispatch } from "redux";
import { Edge } from "@mimirorg/modelbuilder-types";
import { setEdgeVisibility } from "../../../../../../redux/store/project/actions";
import { IsTerminal } from "../../../../../flow/helpers/Connectors";

export const OnTerminalTypeChange = (
  edges: Edge[],
  terminalCategoryId: string,
  terminalTypeId: string,
  isChecked: boolean,
  dispatch: Dispatch
) => {
  edges?.forEach((edge) => {
    if (IsTerminal(edge.fromConnector)) {
      if (edge.fromConnector.terminalCategory === terminalCategoryId && edge.fromConnector.terminalTypeId === terminalTypeId)
        dispatch(setEdgeVisibility(edge.id, isChecked));
    }
  });
};
