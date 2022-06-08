import { ConnectorVisibility } from "@mimirorg/modelbuilder-types";
import { Dispatch } from "redux";
import { changeActiveConnector } from "../../../../../../redux/store/project/actions";
import { IsPartOfRelation } from "../../../../../flow/helpers/Connectors";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const OnActiveTerminalChange = (activeElements: any[], dispatch: Dispatch, visible: boolean) => {
  const edgeTypes = Object.values("Edge");

  // Toggle active terminals and edges
  activeElements.forEach((elem) => {
    const isEdge = edgeTypes.some((x) => x === elem.type?.toString() || elem.kind === "Edge");
    // const connectorVisibility = visible ? ConnectorVisibility.None: elem.connectorVisibility;

    if (isEdge) {
      if (!IsPartOfRelation(elem.fromConnector)) elem.hidden = visible;
    } else dispatch(changeActiveConnector(elem?.nodeId, elem?.id, ConnectorVisibility.InputVisible)); // TODO: fix
  });
};
