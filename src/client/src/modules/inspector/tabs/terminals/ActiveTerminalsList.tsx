import { Color } from "../../../../compLibrary";
import { TerminalCategory } from "../../../../components/modules/typeEditorModule/helpers/GetFilteredTerminalsList";
import { Connector, ConnectorType, TerminalType } from "../../../../models";
import React, { useState } from "react";
import {
  TerminalsListElementWrapper,
  TerminalsCategoryListElement,
} from "./styled/activeTerminalList";
import ActiveTerminalsTypeList from "./ActiveTerminalsTypeList";
import {
  ExpandAccordionIcon,
  CollapseAccordionIcon,
} from "../../../../assets/icons/common";

interface Props {
  terminals: Connector[];
  terminalCategories: TerminalCategory[];
  selectedTerminalId: string;
  onSelectTerminal: (item: Connector) => void;
}

function ActiveTerminalsList({
  terminals,
  terminalCategories,
  selectedTerminalId,
  onSelectTerminal,
}: Props) {
  const [selectedCategoriesIds, setSelectedCategoriesIds] = useState<string[]>(
    []
  );

  const [selectedTypesIds, setSelectedTypesIds] = useState<string[]>([]);

  const filteredCategories = terminalCategories
    .filter((cat) =>
      terminals.find((term) => term.terminalCategoryId === cat.id)
    )
    .map((cat) => ({
      ...cat,
      items: cat.items.filter((terminalType) =>
        terminals.find(
          (terminal) => terminal.terminalTypeId === terminalType.id
        )
      ),
    }));

  const formatTypeId = (type: TerminalType, connectorType: ConnectorType) =>
    `${type.id} ${connectorType}`;

  const isCategoryExpanded = (category: TerminalCategory) =>
    selectedCategoriesIds.includes(category.id);

  const isTypeExpanded = (type: TerminalType, connectorType: ConnectorType) =>
    selectedTypesIds.includes(formatTypeId(type, connectorType));

  const onCategoryClick = (category: TerminalCategory) => {
    if (isCategoryExpanded(category)) {
      setSelectedCategoriesIds(
        selectedCategoriesIds.filter((id) => id !== category.id)
      );
    } else {
      setSelectedCategoriesIds([...selectedCategoriesIds, category.id]);
    }
  };

  const onTypeClick = (type: TerminalType, connectorType: ConnectorType) => {
    const typeId = formatTypeId(type, connectorType);

    if (isTypeExpanded(type, connectorType)) {
      setSelectedTypesIds(selectedTypesIds.filter((id) => id !== typeId));
    } else {
      setSelectedTypesIds([...selectedTypesIds, typeId]);
    }
  };

  const selectedTerminal = terminals.find(
    (term) => term.id === selectedTerminalId
  );

  return (
    <div>
      {filteredCategories.map((category, i) => {
        const categoryExpanded = isCategoryExpanded(category);

        const numCategoryTerminals = terminals.filter(
          (term) => term.terminalCategoryId === category.id
        ).length;

        return (
          <TerminalsListElementWrapper key={category.id}>
            <TerminalsCategoryListElement
              isSelected={selectedTerminal?.terminalCategoryId === category.id}
              radius={0}
              onClick={() => onCategoryClick(category)}
              index={i}
              color={i % 2 ? undefined : Color.LightPurple}
            >
              <div className="numCategoryTerminals">{numCategoryTerminals}</div>

              {category.name}
              <img
                src={
                  categoryExpanded ? ExpandAccordionIcon : CollapseAccordionIcon
                }
                className="dropdownIcon"
                alt="expand-icon"
              />
            </TerminalsCategoryListElement>
            {categoryExpanded &&
              category.items.map((terminalType) => {
                const inputTerminals = terminals.filter(
                  (terminal) =>
                    terminal.terminalTypeId === terminalType.id &&
                    terminal.type === ConnectorType.Input
                );

                const outputTerminals = terminals.filter(
                  (terminal) =>
                    terminal.terminalTypeId === terminalType.id &&
                    terminal.type === ConnectorType.Output
                );

                return (
                  <React.Fragment key={terminalType.id}>
                    {inputTerminals.length > 0 && (
                      <ActiveTerminalsTypeList
                        terminalType={terminalType}
                        connectorType={ConnectorType.Input}
                        expanded={isTypeExpanded(
                          terminalType,
                          ConnectorType.Input
                        )}
                        terminals={inputTerminals}
                        selectedTerminalId={selectedTerminalId}
                        onTypeClick={onTypeClick}
                        onSelectTerminal={onSelectTerminal}
                      />
                    )}
                    {outputTerminals.length > 0 && (
                      <ActiveTerminalsTypeList
                        terminalType={terminalType}
                        connectorType={ConnectorType.Output}
                        expanded={isTypeExpanded(
                          terminalType,
                          ConnectorType.Output
                        )}
                        terminals={outputTerminals}
                        selectedTerminalId={selectedTerminalId}
                        onTypeClick={onTypeClick}
                        onSelectTerminal={onSelectTerminal}
                      />
                    )}
                  </React.Fragment>
                );
              })}
          </TerminalsListElementWrapper>
        );
      })}
    </div>
  );
}

export default ActiveTerminalsList;
