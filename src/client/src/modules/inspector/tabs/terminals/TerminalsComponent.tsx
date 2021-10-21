import { Connector } from "../../../../models";
import { TerminalsSelector } from "./";
import { useMemo, useState } from "react";
import { ParametersContent } from "../parameters";
import { TerminalsWrapper } from "./styled/TerminalsWrapper";
import { TerminalsParametersWrapper } from "./styled/TerminalsParametersWrapper";
import { useAppSelector, terminalTypeSelector } from "../../../../redux/store";
import { GetFilteredTerminalsList } from "../../../../typeEditor/helpers";
import { InspectorElement } from "../../types";
import { GetTerminalParentElement, GetTerminals } from "./helpers";
import { IsCreateLibraryType } from "../../helpers/IsType";

interface Props {
  element: InspectorElement;
}

const TerminalsComponent = ({ element }: Props) => {
  const terminalParentElement = GetTerminalParentElement(element);
  const categoryTypes = useAppSelector(terminalTypeSelector);
  const [selectedTerminalId, setSelectedTerminalId] = useState<string>(null);
  const terminals = useMemo(() => GetTerminals(element), [element]);
  const terminalCategories = useMemo(() => GetFilteredTerminalsList(categoryTypes), [categoryTypes]);
  const selectedTerminal = useMemo(
    () => terminals.find((terminal) => terminal.id === selectedTerminalId),
    [selectedTerminalId, terminals]
  );

  const elementIsLocked = !IsCreateLibraryType(element) ? element.isLocked : false;

  return (
    <TerminalsWrapper>
      <TerminalsSelector
        terminals={terminals}
        terminalCategories={terminalCategories}
        selectedTerminal={selectedTerminal}
        onSelectTerminal={(item: Connector) => setSelectedTerminalId(item.id)}
      />
      {selectedTerminal && (
        <TerminalsParametersWrapper>
          <ParametersContent
            parametersElement={selectedTerminal}
            inspectorParentElement={element}
            terminalParentElement={terminalParentElement}
            elementIsLocked={elementIsLocked}
          />
        </TerminalsParametersWrapper>
      )}
    </TerminalsWrapper>
  );
};

export default TerminalsComponent;
