import { memo, useState } from "react";
import { TerminalElement } from "./TerminalElement";
import { OnCategoryClick } from "./handlers/OnCategoryClick";
import { CollapseAccordionIcon, ExpandAccordionIcon } from "../../../../../../../../../assets/icons/toogle";
import { TerminalsCategoryElement } from "../../../../shared/styled/TerminalsCategoryElement";
import { TerminalsListElementWrapper } from "../../../../shared/styled/TerminalsListElementWrapper";
import { TerminalsCategoryListBox } from "./ActiveTerminalsList.styled";
import { Terminal } from "@mimirorg/modelbuilder-types";
import { TerminalCategoryObject } from "../../../../../../../../../models/project";

interface Props {
  filteredTerminals: Terminal[];
  terminalCategories: TerminalCategoryObject[];
  selectedTerminalId: string;
  onSelectTerminal: (id: string) => void;
}

/**
 * Component to display a Node's terminalCategories and its terminals in the Inspector Module.
 * @param props
 * @returns terminalCategories and a dropdown for its terminals.
 */
export const TerminalsCategoryList = ({ filteredTerminals, terminalCategories, selectedTerminalId, onSelectTerminal }: Props) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const isCategoryExpanded = (category: TerminalCategoryObject) => expandedCategories?.includes(category.name);

  return (
    <TerminalsCategoryListBox>
      {terminalCategories.map((category, i) => {
        if (!ShouldDisplayCategory(category, filteredTerminals)) return null;

        const categoryExpanded = isCategoryExpanded(category);
        const terminalsAmount = category.terminals?.length;
        const sortedTerminals = filteredTerminals?.sort((a, b) => a.type - b.type);
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
                if (terminal.terminalCategory === category.name) {
                  return (
                    <TerminalElement
                      key={terminal.id}
                      terminal={terminal}
                      selectedTerminalId={selectedTerminalId}
                      onSelectTerminal={(id: string) => onSelectTerminal(id)}
                    />
                  );
                }
              })}
          </TerminalsListElementWrapper>
        );
      })}
    </TerminalsCategoryListBox>
  );
};

function ShouldDisplayCategory(category: TerminalCategoryObject, filteredTerminals: Terminal[]) {
  return (
    category.name != undefined &&
    category.terminals?.length &&
    filteredTerminals.some((t) => t.terminalCategory === category.name)
  );
}

export default memo(TerminalsCategoryList);
