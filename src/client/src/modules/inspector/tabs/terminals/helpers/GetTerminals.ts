import { IsTransportTerminal } from "../../../../../components/flow/helpers";
import { Connector } from "../../../../../models";
import { IsEdge, IsNode } from "../../../helpers/IsType";
import { InspectorElement } from "../../../types";

export const GetTerminals = (element: InspectorElement): Connector[] => {
  if (IsNode(element)) {
    return element.connectors.filter((conn) => IsTransportTerminal(conn));
  } else if (IsEdge(element)) {
    return [
      element.transport?.inputTerminal,
      element.transport?.outputTerminal,
      element.interface?.inputTerminal,
      element.interface?.outputTerminal,
    ].filter((x) => x);
  }
};
