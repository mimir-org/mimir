import { TerminalsSelector } from "./";
import { useMemo, useState } from "react";
import { ParametersContent } from "../parameters";
import { TerminalsWrapper } from "./styled/TerminalsWrapper";
import { TerminalsParametersWrapper } from "./styled/TerminalsParametersWrapper";
import { terminalTypeSelector, useAppSelector } from "../../../../redux/store";
import { GetFilteredTerminalsList } from "../../../../typeEditor/helpers";
import { InspectorElement, SelectedTerminalIdentifier, TerminalLikeItem } from "../../types";
import { GetTerminalParentElement, GetTerminals } from "./helpers";
import { IsCreateLibraryType } from "../../helpers/IsType";
import { Project } from "../../../../models";

interface Props {
  element: InspectorElement;
  project: Project;
  terminalLikeItems?: TerminalLikeItem[];
}

const TerminalsComponent = ({ element, project, terminalLikeItems }: Props) => {
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
            project={project}
            elementIsLocked={elementIsLocked}
            attributeLikeItems={selectedTerminal.attributes}
          />
        </TerminalsParametersWrapper>
      )}
    </TerminalsWrapper>
  );
};

export default TerminalsComponent;
