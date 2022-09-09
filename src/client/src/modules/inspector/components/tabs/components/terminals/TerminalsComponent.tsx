import { TerminalsSelector } from "./components/selector/TerminalsSelector";
import { useMemo, useState } from "react";
import { TerminalsBox, TerminalsParametersBox } from "./TerminalsComponent.styled";
import { InspectorElement } from "../../../../types";
import { GetTerminalParentElement } from "./helpers/GetTerminalParentElement";
import { Terminal } from "@mimirorg/modelbuilder-types";
import { PopulateTerminalCategories } from "./components/selector/components/helpers/PopulateTerminalCategories";
import { ParametersComponent } from "../parameters/ParametersComponent";

interface Props {
  element: InspectorElement;
  terminals?: Terminal[];
}

/**
 * Component for the Terminals tab in the Inspector
 * @param props
 * @returns a search field for terminals, and a list over a Node's terminals sorted by category.
 */
export const TerminalsComponent = ({ element, terminals }: Props) => {
  const terminalParentElement = GetTerminalParentElement(element);
  const [selectedTerminalId, setSelectedTerminalId] = useState<string>(null);

  const selectedTerminal = useMemo(
    () => terminals?.find((terminal) => terminal.id === selectedTerminalId),
    [selectedTerminalId, terminals]
  );

  const terminalCategories = useMemo(() => PopulateTerminalCategories(terminals), [terminals]);

  return (
    <TerminalsBox>
      <TerminalsSelector
        terminals={terminals}
        terminalCategories={terminalCategories}
        selectedTerminalId={selectedTerminalId}
        onSelectTerminal={(id: string) => setSelectedTerminalId(id)}
      />
      {selectedTerminal && (
        <TerminalsParametersBox>
          <ParametersComponent
            parametersElem={selectedTerminal}
            inspectorParentElem={element}
            terminalParentElem={terminalParentElement}
            attributeItems={selectedTerminal.attributes}
          />
        </TerminalsParametersBox>
      )}
    </TerminalsBox>
  );
};
