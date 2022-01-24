import { ConnectorType, TerminalType } from "../../../../models";
import { TerminalListElement, TerminalTypeListElement, TerminalsListElementWrapper } from "./styled/activeTerminalList";
import { CollapseAccordionNestedIcon, ExpandAccordionNestedIcon } from "../../../../assets/icons/toogle";
import { SelectedTerminalIdentifier, TerminalLikeItem } from "../../types";
import { useCallback, useMemo } from "react";
import { CountNumberOfTerminals, GetNumberOfTerminals, formatTerminalTypeName } from "./helpers";

interface Props {
  terminalType: TerminalType;
  connectorType: ConnectorType;
  expanded: boolean;
  terminals: TerminalLikeItem[];
  selectedTerminal: TerminalLikeItem;
  selectedTerminalIdentifier: SelectedTerminalIdentifier;
  onTypeClick: (type: TerminalType, connectorType: ConnectorType) => void;
  onSelectTerminal: (identifier: SelectedTerminalIdentifier) => void;
}

function ActiveTerminalsTypeList({
  terminalType,
  connectorType,
  expanded,
  terminals,
  selectedTerminal,
  selectedTerminalIdentifier,
  onTypeClick,
  onSelectTerminal,
}: Props) {
  const numTerminals = useMemo(() => CountNumberOfTerminals(terminals), [terminals]);

  const renderTerminalListElement = useCallback(
    (terminal: TerminalLikeItem) => {
      const numberOfItemsToRender = GetNumberOfTerminals(terminal);

      return [...Array(numberOfItemsToRender).keys()].map((i) => (
        <TerminalListElement
          key={terminal.id + i}
          isSelected={
            selectedTerminalIdentifier?.id === terminal.id &&
            selectedTerminalIdentifier?.index === i &&
            selectedTerminalIdentifier?.connectorType === connectorType
          }
          onClick={() => onSelectTerminal({ id: terminal.id, index: i, connectorType: connectorType })}
        >
          {formatTerminalTypeName(terminal.name, connectorType)}
        </TerminalListElement>
      ));
    },
    [onSelectTerminal, connectorType, selectedTerminalIdentifier]
  );

  return (
    <TerminalsListElementWrapper>
      <TerminalTypeListElement
        onClick={() => onTypeClick(terminalType, connectorType)}
        isSelected={
          selectedTerminal?.terminalTypeId === terminalType.id && selectedTerminalIdentifier?.connectorType === connectorType
        }
      >
        <div className="numTypeTerminals">{numTerminals}</div>
        {formatTerminalTypeName(terminalType.name, connectorType)}
        <img
          src={expanded ? CollapseAccordionNestedIcon : ExpandAccordionNestedIcon}
          className="dropdownIcon"
          alt="expand-icon"
        />
      </TerminalTypeListElement>
      {expanded && terminals.map((terminal) => renderTerminalListElement(terminal))}
    </TerminalsListElementWrapper>
  );
}

export default ActiveTerminalsTypeList;
