import React, { useMemo, useState } from "react";
import { Color } from "../../../../compLibrary/colors";
import { TerminalCategory } from "../../../../typeEditor/helpers/GetFilteredTerminalsList";
import { ConnectorType, TerminalType } from "../../../../models";
import { ActiveTerminalsTypeList } from "./";
import { OnCategoryClick, OnTypeClick } from "./handlers";
import { ExpandAccordionIcon, CollapseAccordionIcon } from "../../../../assets/icons/toogle";
import { SelectedTerminalIdentifier, TerminalLikeItem } from "../../types";
import {
  FilterTerminalCategories,
  FormatTypeId,
  GetInputAndOutputTerminalsByTerminalType,
  GetNumTerminalsByCategory,
} from "./helpers";

import {
  TerminalsListElementWrapper,
  TerminalsCategoryListElement,
  ActiveTerminalListWrapper,
} from "./styled/activeTerminalList";

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
  const [expandedCategoriesIds, setExpandedCategoriesIds] = useState<string[]>(terminalCategories.map((cat) => cat.id));
  const [expandedTypesIds, setExpandedTypesIds] = useState<string[]>(
    terminalCategories
      .map((cat) => cat.items)
      .flat()
      .map((type) => [FormatTypeId(type, ConnectorType.Input), FormatTypeId(type, ConnectorType.Output)])
      .flat()
  );
  const filteredCategories = useMemo(
    () => FilterTerminalCategories(terminalCategories, terminals),
    [terminalCategories, terminals]
  );
  const [inputTerminalsByTerminalType, outputTerminalsByTerminalType] = useMemo(
    () => GetInputAndOutputTerminalsByTerminalType(terminals),
    [terminals]
  );
  const numTerminalsByCategoryId = useMemo(() => GetNumTerminalsByCategory(terminals), [terminals]);

  const isCategoryExpanded = (category: TerminalCategory) => expandedCategoriesIds.includes(category.id);
  const isTypeExpanded = (type: TerminalType, connectorType: ConnectorType) =>
    expandedTypesIds.includes(FormatTypeId(type, connectorType));

  return (
    <ActiveTerminalListWrapper>
      {filteredCategories.map((category, i) => {
        const categoryExpanded = isCategoryExpanded(category);
        const numCategoryTerminals = numTerminalsByCategoryId.get(category.id);

        return (
          <TerminalsListElementWrapper key={category.id}>
            <TerminalsCategoryListElement
              isSelected={selectedTerminal?.terminalCategoryId === category.id}
              radius={0}
              onClick={() =>
                OnCategoryClick(category, isCategoryExpanded(category), expandedCategoriesIds, setExpandedCategoriesIds)
              }
              color={i % 2 ? undefined : Color.PurpleLight}
            >
              <div className="numCategoryTerminals">{numCategoryTerminals}</div>

              {category.name}
              <img
                src={categoryExpanded ? CollapseAccordionIcon : ExpandAccordionIcon}
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
                    OnTypeClick(type, connectorType, isTypeExpanded(type, connectorType), expandedTypesIds, setExpandedTypesIds),
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
    </ActiveTerminalListWrapper>
  );
}

export default ActiveTerminalsList;
