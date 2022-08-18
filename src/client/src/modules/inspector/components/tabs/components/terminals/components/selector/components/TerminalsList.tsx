import { memo, useMemo, useState } from "react";
import { TerminalElement } from "./TerminalElement";
import { OnCategoryClick } from "./handlers/OnCategoryClick";
import { CollapseAccordionIcon, ExpandAccordionIcon } from "../../../../../../../../../assets/icons/toogle";
import { TerminalsCategoryElement } from "../../../../shared/styled/TerminalsCategoryElement";
import { TerminalsListElementWrapper } from "../../../../shared/styled/TerminalsListElementWrapper";
import { TerminalsCategoryListBox } from "./ActiveTerminalsList.styled";
import { Terminal } from "@mimirorg/modelbuilder-types";
import { PopulateTerminalCategories } from "./helpers/PopulateTerminalCategories";

export interface CategoryObject {
  name: string;
  terminals: Terminal[];
}

interface Props {
  terminals: Terminal[];
  selectedTerminalId: string;
  onSelectTerminal: (id: string) => void;
}

/**
 * Component to display a Node's terminalCategories and its terminals in the Inspector Module.
 * This content is displayed under the tab in the Inspector called "Terminals".
 * @param props
 * @returns terminalCategories and a dropdown for its terminals.
 */
export const TerminalsCategoryList = ({ terminals, selectedTerminalId, onSelectTerminal }: Props) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const terminalCategories = useMemo(() => PopulateTerminalCategories(terminals), [terminals]);
  const isCategoryExpanded = (category: CategoryObject) => expandedCategories?.includes(category.name);

  return (
    <TerminalsCategoryListBox>
      {terminalCategories.map((category, i) => {
        if (category.name === undefined || !category.terminals.length) return null;

        const categoryExpanded = isCategoryExpanded(category);
        const terminalsAmount = category.terminals.length;
        const sortedTerminals = category.terminals.sort((a, b) => a.type - b.type);
        const icon = categoryExpanded ? CollapseAccordionIcon : ExpandAccordionIcon;

        return (
          <TerminalsListElementWrapper key={i}>
            <TerminalsCategoryElement
              radius={0}
              onClick={() => OnCategoryClick(category, categoryExpanded, expandedCategories, setExpandedCategories)}
              index={i}
              isCategoryHeader
            >
              <div className="terminalsAmount">{terminalsAmount}</div>
              {category.name}
              <img src={icon} className="dropdownIcon" alt="expand-icon" />
            </TerminalsCategoryElement>

            {categoryExpanded &&
              sortedTerminals.map((terminal) => {
                return (
                  <TerminalElement
                    key={terminal.id}
                    terminal={terminal}
                    selectedTerminalId={selectedTerminalId}
                    onSelectTerminal={(id: string) => onSelectTerminal(id)}
                  />
                );
              })}
          </TerminalsListElementWrapper>
        );
      })}
    </TerminalsCategoryListBox>
  );
};

export default memo(TerminalsCategoryList);
