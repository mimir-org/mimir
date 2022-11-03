import { TerminalsSelector } from "./components/selector/TerminalsSelector";
import { useMemo, useState } from "react";
import { TerminalsBox, TerminalAttributesBox } from "./TerminalAttributesComponent.styled";
import { InspectorElement } from "../../../../types";
import { Terminal } from "@mimirorg/modelbuilder-types";
import { PopulateTerminalCategories } from "./components/selector/components/helpers/PopulateTerminalCategories";
import { AttributesComponent } from "../parameters/AttributesComponent";

interface Props {
  element: InspectorElement;
  terminals?: Terminal[];
}

/**
 * Component for the TerminalAttributes tab in the Inspector.
 * @param props
 * @returns a search field for terminals, and a list over a Node's terminals sorted by category.
 */
export const TerminalAttributesComponent = ({ element, terminals }: Props) => {
  const [selectedTerminalId, setSelectedTerminalId] = useState<string>(null);

  const selectedTerminal = useMemo(
    () => terminals?.find((terminal) => terminal.id === selectedTerminalId),
    [selectedTerminalId, terminals]
  );

  const terminalCategories = useMemo(() => PopulateTerminalCategories(terminals), [terminals]);

  return (
    <>
      {element && (
        <TerminalsBox>
          <TerminalsSelector
            terminals={terminals}
            terminalCategories={terminalCategories}
            selectedTerminalId={selectedTerminalId}
            onSelectTerminal={(id: string) => setSelectedTerminalId(id)}
          />
          {selectedTerminal && (
            <TerminalAttributesBox>
              <AttributesComponent
                attributesElem={selectedTerminal}
                inspectorParentElem={element}
                attributeItems={selectedTerminal.attributes}
              />
            </TerminalAttributesBox>
          )}
        </TerminalsBox>
      )}
    </>
  );
};
