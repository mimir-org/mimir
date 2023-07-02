import { TerminalsSelector } from "./components/selector/TerminalsSelector";
import { useState } from "react";
import { TerminalsBox, TerminalAttributesBox } from "./TerminalAttributesComponent.styled";
import { InspectorElement } from "../../../../types";
import { AttributesComponent } from "../parameters/AttributesComponent";
import { ConnectorTerminal } from "lib";

interface Props {
  element: InspectorElement;
  terminals?: ConnectorTerminal[];
}

/**
 * Component for the TerminalAttributes tab in the Inspector.
 * @param props
 * @returns a search field for terminals, and a list over a Node's terminals sorted by category.
 */
export const TerminalAttributesComponent = ({ element, terminals }: Props) => {
  const [selectedTerminalId, setSelectedTerminalId] = useState<string>(null);

  return (
    <>
      {element && terminals && (
        <TerminalsBox>
          <TerminalsSelector
            terminals={terminals}
            selectedTerminalId={selectedTerminalId}
            onSelect={(id: string) => setSelectedTerminalId(id)}
          />
          {selectedTerminalId && (
            <TerminalAttributesBox>
              <AttributesComponent
                attributesElem={terminals?.find((x) => x.id === selectedTerminalId)}
                inspectorParentElem={element}
                attributeItems={terminals?.find((x) => x.id === selectedTerminalId)?.attributes}
              />
            </TerminalAttributesBox>
          )}
        </TerminalsBox>
      )}
    </>
  );
};
