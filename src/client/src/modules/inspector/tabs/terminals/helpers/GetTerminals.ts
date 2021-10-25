import { IsTransportTerminal } from "../../../../../components/flow/helpers";
import { IsEdge, IsNode } from "../../../helpers/IsType";
import { InspectorElement, TerminalLikeItem } from "../../../types";

export const GetTerminals = (element: InspectorElement): TerminalLikeItem[] => {
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
