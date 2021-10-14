import { Connector, TerminalType } from "../../../../models";
import { TerminalsSelector } from "./";
import { useState } from "react";
import { ParametersContent } from "../parameters";
import { TerminalsWrapper } from "./styled/TerminalsWrapper";
import { TerminalsParametersWrapper } from "./styled/TerminalsParametersWrapper";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { GetFilteredTerminalsList } from "../../../../typeEditor/helpers";
import { InspectorElement } from "../../types";
import { GetTerminalParentElement, GetTerminals } from "./helpers";

interface Props {
  element: InspectorElement;
}

const TerminalsComponent = ({ element }: Props) => {
  const categoryTypes = (useSelector<RootState>((state) => state.typeEditor.terminals) as TerminalType[]) ?? [];
  const terminals = GetTerminals(element);
  const terminalParentElement = GetTerminalParentElement(element);
  const terminalCategories = GetFilteredTerminalsList(categoryTypes);
  const [selectedTerminalId, setSelectedTerminalId] = useState<string>(null);
  const onSelectTerminal = (item: Connector) => setSelectedTerminalId(item.id);
  const selectedTerminal = terminals.find((terminal) => terminal.id === selectedTerminalId);

  return (
    <TerminalsWrapper>
      <TerminalsSelector
        terminals={terminals}
        terminalCategories={terminalCategories}
        selectedTerminalId={selectedTerminalId}
        onSelectTerminal={onSelectTerminal}
      />
      {selectedTerminal && (
        <TerminalsParametersWrapper>
          <ParametersContent
            parametersElement={selectedTerminal}
            inspectorParentElement={element}
            terminalParentElement={terminalParentElement}
            elementIsLocked={element.isLocked}
          />
        </TerminalsParametersWrapper>
      )}
    </TerminalsWrapper>
  );
};

export default TerminalsComponent;
