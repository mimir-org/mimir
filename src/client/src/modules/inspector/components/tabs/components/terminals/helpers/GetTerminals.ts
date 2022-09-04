import { Terminal } from "@mimirorg/modelbuilder-types";
import { IsTerminal } from "../../../../../../../components/flow/helpers/Connectors";
import { IsEdge, IsNode } from "../../../../../helpers/IsType";
import { InspectorElement } from "../../../../../types";

export const GetTerminals = (element: InspectorElement): Terminal[] => {
  if (IsNode(element)) return element.connectors.filter((conn) => IsTerminal(conn)) as Terminal[];

  if (IsEdge(element)) {
    return [
      element.transport?.inputTerminal,
      element.transport?.outputTerminal,
      element.interface?.inputTerminal,
      element.interface?.outputTerminal,
    ].filter((x) => x);
  }
};
