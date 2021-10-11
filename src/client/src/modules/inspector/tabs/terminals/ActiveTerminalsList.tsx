import React, { useState } from "react";
import { Color } from "../../../../compLibrary";
import { TerminalCategory } from "../../../../typeEditor/helpers/GetFilteredTerminalsList";
import { Connector, ConnectorType, TerminalType } from "../../../../models";
import { ActiveTerminalsTypeList } from "./";
import { OnCategoryClick, OnTypeClick } from "./handlers";
import { FilterTerminalCategories, FormatTypeId } from "./helpers";
import { IsInputTerminal, IsOutputTerminal } from "../../../../components/flow/helpers";
import { ExpandAccordionIcon, CollapseAccordionIcon } from "../../../../assets/icons/toogle";
import { TerminalsListElementWrapper, TerminalsCategoryListElement } from "./styled/activeTerminalList";

interface Props {
  terminals: Connector[];
  terminalCategories: TerminalCategory[];
  selectedTerminalId: string;
  onSelectTerminal: (item: Connector) => void;
}

function ActiveTerminalsList({ terminals, terminalCategories, selectedTerminalId, onSelectTerminal }: Props) {
  const [selectedCategoriesIds, setSelectedCategoriesIds] = useState<string[]>([]);
  const [selectedTypesIds, setSelectedTypesIds] = useState<string[]>([]);
  const filteredCategories = FilterTerminalCategories(terminalCategories, terminals);
  const isCategoryExpanded = (category: TerminalCategory) => selectedCategoriesIds.includes(category.id);

  const isTypeExpanded = (type: TerminalType, connectorType: ConnectorType) =>
    selectedTypesIds.includes(FormatTypeId(type, connectorType));

  const selectedTerminal = terminals.find((term) => term.id === selectedTerminalId);

  return (
    <>
      {filteredCategories.map((category, i) => {
        const categoryExpanded = isCategoryExpanded(category);
        const numCategoryTerminals = terminals.filter((term) => term.terminalCategoryId === category.id).length;

        return (
          <TerminalsListElementWrapper key={category.id}>
            <TerminalsCategoryListElement
              isSelected={selectedTerminal?.terminalCategoryId === category.id}
              radius={0}
              onClick={() =>
                OnCategoryClick(category, isCategoryExpanded(category), selectedCategoriesIds, setSelectedCategoriesIds)
              }
              index={i}
              color={i % 2 ? undefined : Color.LightPurple}
            >
              <div className="numCategoryTerminals">{numCategoryTerminals}</div>

              {category.name}
              <img
                src={categoryExpanded ? ExpandAccordionIcon : CollapseAccordionIcon}
                className="dropdownIcon"
                alt="expand-icon"
              />
            </TerminalsCategoryListElement>
            {categoryExpanded &&
              category.items.map((terminalType) => {
                const inputTerminals = terminals.filter(
                  (terminal) => terminal.terminalTypeId === terminalType.id && IsInputTerminal(terminal)
                );

                const outputTerminals = terminals.filter(
                  (terminal) => terminal.terminalTypeId === terminalType.id && IsOutputTerminal(terminal)
                );

                const terminalTypeListProps = {
                  terminalType: terminalType,
                  selectedTerminalId: selectedTerminalId,
                  onTypeClick: (type, connectorType) =>
                    OnTypeClick(
                      type,
                      connectorType,
                      isTypeExpanded(type, connectorType),
                      selectedTypesIds,
                      setSelectedTypesIds
                    ),
                  onSelectTerminal: onSelectTerminal,
                };

                return (
                  <React.Fragment key={terminalType.id}>
                    {inputTerminals.length > 0 && (
                      <ActiveTerminalsTypeList
                        {...terminalTypeListProps}
                        terminals={inputTerminals}
                        connectorType={ConnectorType.Input}
                        expanded={isTypeExpanded(terminalType, ConnectorType.Input)}
                      />
                    )}
                    {outputTerminals.length > 0 && (
                      <ActiveTerminalsTypeList
                        {...terminalTypeListProps}
                        terminals={outputTerminals}
                        connectorType={ConnectorType.Output}
                        expanded={isTypeExpanded(terminalType, ConnectorType.Output)}
                      />
                    )}
                  </React.Fragment>
                );
              })}
          </TerminalsListElementWrapper>
        );
      })}
    </>
  );
}

export default ActiveTerminalsList;
