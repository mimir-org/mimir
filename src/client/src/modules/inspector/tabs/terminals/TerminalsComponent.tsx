import { TerminalsSelector } from "./";
import { useMemo, useState } from "react";
import { ParametersContent } from "../parameters";
import { TerminalsWrapper } from "./styled/TerminalsWrapper";
import { TerminalsParametersWrapper } from "./styled/TerminalsParametersWrapper";
import { useAppSelector, terminalTypeSelector } from "../../../../redux/store";
import { GetFilteredTerminalsList } from "../../../../typeEditor/helpers";
import { InspectorElement, SelectedTerminalIdentifier, TerminalLikeItem } from "../../types";
import { GetTerminalParentElement, GetTerminals } from "./helpers";
import { IsCreateLibraryType } from "../../helpers/IsType";

interface Props {
  element: InspectorElement;
  terminalLikeItems?: TerminalLikeItem[];
}

const TerminalsComponent = ({ element, terminalLikeItems }: Props) => {
  const terminalParentElement = GetTerminalParentElement(element);
  const categoryTypes = useAppSelector(terminalTypeSelector);
  const [selectedTerminalIdentifier, setSelectedTerminalIdentifier] = useState<SelectedTerminalIdentifier>(null);
  const terminals = terminalLikeItems ?? GetTerminals(element);
  const terminalCategories = useMemo(() => GetFilteredTerminalsList(categoryTypes), [categoryTypes]);
  const selectedTerminal = useMemo(
    () => terminals.find((terminal) => terminal.id === selectedTerminalIdentifier?.id),
    [selectedTerminalIdentifier, terminals]
  );

  const elementIsLocked = !IsCreateLibraryType(element) ? element.isLocked : false;

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
            elementIsLocked={elementIsLocked}
            attributeLikeItems={selectedTerminal.attributes}
          />
        </TerminalsParametersWrapper>
      )}
    </TerminalsWrapper>
  );
};

export default TerminalsComponent;
