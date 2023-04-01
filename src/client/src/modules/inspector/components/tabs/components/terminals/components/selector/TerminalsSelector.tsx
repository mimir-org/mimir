import { useState } from "react";
import { TerminalsCategoryListBox } from "./components/ActiveTerminalsList.styled";
import { TerminalsCategoryElement } from "../../../shared/styled/TerminalsCategoryElement";
import { CollapseAccordionIcon, ExpandAccordionIcon } from "../../../../../../../../assets/icons/toogle";
import { TerminalElementList } from "./TerminalElementList";
import { TerminalsListElementWrapper } from "../../../shared/styled/TerminalsListElementWrapper";
import { ConnectorTerminal } from "lib";

interface Props {
  terminals: ConnectorTerminal[];
  selectedTerminalId: string;
  onSelect: (id: string) => void;
}

/**
 * Component for the terminals search in the Terminals tab in the Inspector
 * @param props
 * @returns an input field for search and a list of terminals.
 */
export const TerminalsSelector = ({ terminals, selectedTerminalId, onSelect }: Props) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const categories = [...new Set(terminals?.map((t) => t.terminalParentType))];

  const OnCategoryClick = (name: string) => {
    const expanded = expandedCategories?.includes(name);
    if (expanded) {
      setExpandedCategories(expandedCategories.filter((category) => category !== name));
    } else {
      setExpandedCategories([...expandedCategories, name]);
    }
  };

  return (
    <TerminalsCategoryListBox>
      {categories &&
        categories.map((category, i) => (
          <TerminalsListElementWrapper key={i}>
            <TerminalsCategoryElement radius={0} onClick={() => OnCategoryClick(category)} index={i} isCategoryHeader>
              {category}
              <img
                src={expandedCategories?.includes(category) ? CollapseAccordionIcon : ExpandAccordionIcon}
                className="dropdownIcon"
                alt="expand-icon"
              />
            </TerminalsCategoryElement>
            <TerminalElementList
              terminals={terminals.filter((x) => x.terminalParentType === category)}
              selectedTerminal={selectedTerminalId}
              onSelect={onSelect}
              visible={expandedCategories?.includes(category)}
            />
          </TerminalsListElementWrapper>
        ))}
    </TerminalsCategoryListBox>
  );
};
