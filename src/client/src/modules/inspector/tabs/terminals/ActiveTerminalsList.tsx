import React, { useMemo, useState } from "react";
import { Color } from "../../../../compLibrary";
import { TerminalCategory } from "../../../../typeEditor/helpers/GetFilteredTerminalsList";
import { ConnectorType, TerminalType } from "../../../../models";
import { ActiveTerminalsTypeList } from "./";
import { OnCategoryClick, OnTypeClick } from "./handlers";
import {
  FilterTerminalCategories,
  FormatTypeId,
  GetInputAndOutputTerminalsByTerminalType,
  GetNumTerminalsByCategory,
} from "./helpers";
import { ExpandAccordionIcon, CollapseAccordionIcon } from "../../../../assets/icons/toogle";
import { TerminalsListElementWrapper, TerminalsCategoryListElement } from "./styled/activeTerminalList";
import { SelectedTerminalIdentifier, TerminalLikeItem } from "../../types";

interface Props {
  terminals: TerminalLikeItem[];
  terminalCategories: TerminalCategory[];
  selectedTerminal: TerminalLikeItem;
  selectedTerminalIdentifier: SelectedTerminalIdentifier;
  onSelectTerminal: (identifier: SelectedTerminalIdentifier) => void;
}

function ActiveTerminalsList({
  terminals,
  terminalCategories,
  selectedTerminal,
  selectedTerminalIdentifier,
  onSelectTerminal,
}: Props) {
  const [selectedCategoriesIds, setSelectedCategoriesIds] = useState<string[]>([]);
  const [selectedTypesIds, setSelectedTypesIds] = useState<string[]>([]);
  const filteredCategories = useMemo(
    () => FilterTerminalCategories(terminalCategories, terminals),
    [terminalCategories, terminals]
  );
  const [inputTerminalsByTerminalType, outputTerminalsByTerminalType] = useMemo(
    () => GetInputAndOutputTerminalsByTerminalType(terminals),
    [terminals]
  );
  const numTerminalsByCategoryId = useMemo(() => GetNumTerminalsByCategory(terminals), [terminals]);

  const isCategoryExpanded = (category: TerminalCategory) => selectedCategoriesIds.includes(category.id);
  const isTypeExpanded = (type: TerminalType, connectorType: ConnectorType) =>
    selectedTypesIds.includes(FormatTypeId(type, connectorType));

  return (
    <>
      {filteredCategories.map((category, i) => {
        const categoryExpanded = isCategoryExpanded(category);
        const numCategoryTerminals = numTerminalsByCategoryId.get(category.id);

        return (
          <TerminalsListElementWrapper key={category.id}>
            <TerminalsCategoryListElement
              isSelected={selectedTerminal?.terminalCategoryId === category.id}
              radius={0}
              onClick={() =>
                OnCategoryClick(category, isCategoryExpanded(category), selectedCategoriesIds, setSelectedCategoriesIds)
              }
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
                const inputTerminals = inputTerminalsByTerminalType.get(terminalType.id);
                const outputTerminals = outputTerminalsByTerminalType.get(terminalType.id);

                const terminalTypeListProps = {
                  terminalType: terminalType,
                  selectedTerminal: selectedTerminal,
                  selectedTerminalIdentifier: selectedTerminalIdentifier,
                  onTypeClick: (type: TerminalType, connectorType: ConnectorType) =>
                    OnTypeClick(
                      type,
                      connectorType,
                      isTypeExpanded(type, connectorType),
                      selectedTypesIds,
                      setSelectedTypesIds
                    ),
                  onSelectTerminal,
                };

                return (
                  <React.Fragment key={terminalType.id}>
                    {inputTerminals?.length > 0 && (
                      <ActiveTerminalsTypeList
                        {...terminalTypeListProps}
                        terminals={inputTerminals}
                        connectorType={ConnectorType.Input}
                        expanded={isTypeExpanded(terminalType, ConnectorType.Input)}
                      />
                    )}
                    {outputTerminals?.length > 0 && (
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
