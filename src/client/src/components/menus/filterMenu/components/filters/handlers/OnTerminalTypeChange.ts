import { Connection } from "lib";
import { Dispatch } from "redux";

export const OnTerminalTypeChange = (
  edges: Connection[],
  terminalParentTypeName: string,
  terminalTypeId: string,
  isChecked: boolean,
  dispatch: Dispatch
) => {
  edges?.forEach((edge) => {
    // if (!IsTerminal(edge.fromConnector)) return;
    // if (
    //   edge.fromConnector.terminalParentTypeName === terminalParentTypeName &&
    //   edge.fromConnector.terminalTypeId === terminalTypeId
    // )
    //   dispatch(setEdgeVisibility(edge.id, isChecked));
  });
};
