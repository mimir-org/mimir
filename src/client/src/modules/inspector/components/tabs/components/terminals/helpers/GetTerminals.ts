import { IsTransport } from "../../../../../../../components/flow/helpers/Connectors";
import { Connector } from "../../../../../../../models";
import { IsEdge, IsNode } from "../../../../../helpers/IsType";
import { InspectorElement } from "../../../../../types";

export const GetTerminals = (element: InspectorElement): Connector[] => {
  if (IsNode(element)) return element.connectors.filter((conn) => IsTransport(conn));

  if (IsEdge(element)) {
    return [
      element.transport?.inputTerminal,
      element.transport?.outputTerminal,
      element.interface?.inputTerminal,
      element.interface?.outputTerminal,
    ].filter((x) => x);
  }
};
