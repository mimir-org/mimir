import { TerminalsSelector } from "./components/selector/TerminalsSelector";
import { useMemo, useState } from "react";
import { ParametersContent } from "../shared/components/parametersContent/ParametersContent";
import { TerminalsBox, TerminalsParametersBox } from "./TerminalsComponent.styled";
import { InspectorElement } from "../../../../types";
import { GetTerminalParentElement } from "./helpers/GetTerminalParentElement";
import { Terminal } from "@mimirorg/modelbuilder-types";

interface Props {
  element: InspectorElement;
  terminals?: Terminal[];
}

export const TerminalsComponent = ({ element, terminals }: Props) => {
  const terminalParentElement = GetTerminalParentElement(element);
  const [selectedTerminalId, setSelectedTerminalId] = useState<string>(null);

  const selectedTerminal = useMemo(
    () => terminals?.find((terminal) => terminal.id === selectedTerminalId),
    [selectedTerminalId, terminals]
  );

  return (
    <TerminalsBox>
      <TerminalsSelector
        terminals={terminals}
        selectedTerminalId={selectedTerminalId}
        onSelectTerminal={(id: string) => setSelectedTerminalId(id)}
      />
      {selectedTerminal && (
        <TerminalsParametersBox>
          <ParametersContent
            parametersElement={selectedTerminal}
            inspectorParentElement={element}
            terminalParentElement={terminalParentElement}
            attributes={selectedTerminal.attributes}
          />
        </TerminalsParametersBox>
      )}
    </TerminalsBox>
  );
};
