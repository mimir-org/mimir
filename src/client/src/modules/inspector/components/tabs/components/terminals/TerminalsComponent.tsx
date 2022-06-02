import { TerminalsSelector } from "./components/selector/TerminalsSelector";
import { useMemo, useState } from "react";
import { ParametersContent } from "../shared/components/parametersContent/ParametersContent";
import { TerminalsWrapper, TerminalsParametersWrapper } from "./TerminalsComponent.styled";
import { terminalTypeSelector, useAppSelector } from "../../../../../../redux/store";
import { GetFilteredTerminalsList } from "../../../../../../typeEditor/helpers";
import { InspectorElement, SelectedTerminalIdentifier, TerminalLikeItem } from "../../../../types";
import { GetTerminalParentElement } from "./helpers/GetTerminalParentElement";
import { GetTerminals } from "./helpers/GetTerminals";

interface Props {
  element: InspectorElement;
  terminalLikeItems?: TerminalLikeItem[];
}

export const TerminalsComponent = ({ element, terminalLikeItems }: Props) => {
  const terminalParentElement = GetTerminalParentElement(element);
  const categoryTypes = useAppSelector(terminalTypeSelector);
  const [selectedTerminalIdentifier, setSelectedTerminalIdentifier] = useState<SelectedTerminalIdentifier>(null);
  const terminals = terminalLikeItems ?? GetTerminals(element);
  const terminalCategories = useMemo(() => GetFilteredTerminalsList(categoryTypes), [categoryTypes]);

  const selectedTerminal = useMemo(
    () => terminals.find((terminal) => terminal.id === selectedTerminalIdentifier?.id),
    [selectedTerminalIdentifier, terminals]
  );

  return (
    <TerminalsWrapper>
      <TerminalsSelector
        terminals={terminals}
        terminalCategories={terminalCategories}
        selectedTerminal={selectedTerminal}
        selectedTerminalIdentifier={selectedTerminalIdentifier}
        onSelectTerminal={(identifier: SelectedTerminalIdentifier) => setSelectedTerminalIdentifier(identifier)}
      />
      {selectedTerminal && (
        <TerminalsParametersWrapper>
          <ParametersContent
            parametersElement={selectedTerminal}
            inspectorParentElement={element}
            terminalParentElement={terminalParentElement}
            attributeLikeItems={selectedTerminal.attributes}
          />
        </TerminalsParametersWrapper>
      )}
    </TerminalsWrapper>
  );
};
