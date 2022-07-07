import { TerminalType } from "../../../../../../../../../models";
import { TerminalsListElementWrapper } from "../../../../shared/styled/TerminalsListElementWrapper";
import { TerminalListElement, TerminalTypeListElement } from "./ActiveTerminalsTypeList.styled";
import { CollapseAccordionNestedIcon, ExpandAccordionNestedIcon } from "../../../../../../../../../assets/icons/toogle";
import { SelectedTerminalIdentifier, TerminalLikeItem } from "../../../../../../../types";
import { useCallback, useMemo } from "react";
import { CountNumberOfTerminals, GetNumberOfTerminals } from "./helpers/GetNumTerminals";
import { formatTerminalTypeName } from "./helpers/FormatTerminalTypeName";
import { ConnectorDirection } from "@mimirorg/modelbuilder-types";

interface Props {
  terminalType: TerminalType;
  connectorType: ConnectorDirection;
  expanded: boolean;
  terminals: TerminalLikeItem[];
  selectedTerminal: TerminalLikeItem;
  selectedTerminalIdentifier: SelectedTerminalIdentifier;
  onTypeClick: (type: TerminalType, connectorType: ConnectorDirection) => void;
  onSelectTerminal: (identifier: SelectedTerminalIdentifier) => void;
}

export const ActiveTerminalsTypeList = ({
  terminalType,
  connectorType,
  expanded,
  terminals,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  selectedTerminal,
  selectedTerminalIdentifier,
  onTypeClick,
  onSelectTerminal,
}: Props) => {
  const numTerminals = useMemo(() => CountNumberOfTerminals(terminals), [terminals]);

  const renderTerminalListElement = useCallback(
    (terminal: TerminalLikeItem) => {
      const numberOfItemsToRender = GetNumberOfTerminals(terminal);

      return [...Array(numberOfItemsToRender).keys()].map((i) => (
        <TerminalListElement
          key={terminal.id + i}
          selected={
            selectedTerminalIdentifier?.id === terminal.id &&
            selectedTerminalIdentifier?.index === i &&
            selectedTerminalIdentifier?.connectorType === connectorType
          }
          onClick={() => onSelectTerminal({ id: terminal.id, index: i, connectorType })}
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
        selected={selectedTerminalIdentifier?.connectorType === connectorType} // selectedTerminal?.terminalTypeId === terminalType.id && selectedTerminalIdentifier?.connectorType === connectorType  // TODO: fix
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
};

export default ActiveTerminalsTypeList;
