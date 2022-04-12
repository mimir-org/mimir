import { Dispatch } from "redux";
import { ConnectorVisibility, EDGE_KIND } from "../../../../../../models";
import { EDGE_TYPE } from "../../../../../../models/project";
import { changeActiveConnector } from "../../../../../../redux/store/project/actions";
import { IsPartOfTerminal } from "../../../../../flow/helpers/Connectors";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const OnActiveTerminalChange = (activeElements: any[], dispatch: Dispatch, visible: boolean) => {
  const edgeTypes = Object.values(EDGE_TYPE);

  // Toggle active terminals and edges
  activeElements.forEach((elem) => {
    const isEdge = edgeTypes.some((x) => x === elem.type?.toString() || elem.kind === EDGE_KIND);
    // const connectorVisibility = visible ? ConnectorVisibility.None: elem.connectorVisibility;

    if (isEdge) {
      if (!IsPartOfTerminal(elem.fromConnector)) elem.hidden = visible;
    } else dispatch(changeActiveConnector(elem?.nodeId, elem?.id, ConnectorVisibility.InputVisible)); // TODO: fix
  });
};
