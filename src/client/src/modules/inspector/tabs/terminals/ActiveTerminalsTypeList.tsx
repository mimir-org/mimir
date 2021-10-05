import { Connector, ConnectorType, TerminalType } from "../../../../models";
import {
  TerminalTypeListElement,
  TerminalsListElementWrapper,
  TerminalListElement,
} from "./styled/activeTerminalList";
import {
  ExpandAccordionNestedIcon,
  CollapseAccordionNestedIcon,
} from "../../../../assets/icons/common";

interface Props {
  terminalType: TerminalType;
  connectorType: ConnectorType;
  expanded: boolean;
  terminals: Connector[];
  selectedTerminalId: string;
  onTypeClick: (type: TerminalType, connectorType: ConnectorType) => void;
  onSelectTerminal: (item: Connector) => void;
}

function ActiveTerminalsTypeList({
  terminalType,
  connectorType,
  expanded,
  terminals,
  selectedTerminalId,
  onTypeClick,
  onSelectTerminal,
}: Props) {
  const selectedTerminal = terminals.find((term) => term.id === selectedTerminalId);

  const formatTerminalTypeName = (name: string) =>
    `${name} [${ConnectorType[connectorType].toLowerCase()}]`;

  return (
    <TerminalsListElementWrapper>
      <TerminalTypeListElement
        onClick={() => onTypeClick(terminalType, connectorType)}
        isSelected={!!selectedTerminal}
      >
        <div className="numTypeTerminals">{terminals.length}</div>
        {formatTerminalTypeName(terminalType.name)}
        <img
          src={expanded ? ExpandAccordionNestedIcon : CollapseAccordionNestedIcon}
          className="dropdownIcon"
          alt="expand-icon"
        />
      </TerminalTypeListElement>
      {expanded &&
        terminals.map((terminal) => (
          <TerminalListElement
            key={terminal.id}
            isSelected={selectedTerminal?.id === terminal.id}
            onClick={() => onSelectTerminal(terminal)}
          >
            {formatTerminalTypeName(terminal.name)}
          </TerminalListElement>
        ))}
    </TerminalsListElementWrapper>
  );
}

export default ActiveTerminalsTypeList;
