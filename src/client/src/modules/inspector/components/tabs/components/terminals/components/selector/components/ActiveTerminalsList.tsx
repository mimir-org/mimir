import React, { useMemo, useState } from "react";
import { Color } from "../../../../../../../../../assets/color/Color";
import { TerminalType } from "../../../../../../../../../models";
import { ActiveTerminalsTypeList } from "./ActiveTerminalsTypeList";
import { OnCategoryClick } from "./handlers/OnCategoryClick";
import { OnTypeClick } from "./handlers/OnTypeClick";
import { CollapseAccordionIcon, ExpandAccordionIcon } from "../../../../../../../../../assets/icons/toogle";
import { SelectedTerminalIdentifier, TerminalLikeItem } from "../../../../../../../types";
import { TerminalsCategoryListElement } from "../../../../shared/styled/TerminalsCategoryListElement";
import { TerminalsListElementWrapper } from "../../../../shared/styled/TerminalsListElementWrapper";
import { ActiveTerminalListWrapper } from "./ActiveTerminalsList.styled";
import { FormatTypeId } from "./helpers/FormatTypeId";
import { FilterTerminalCategories } from "./helpers/FilterTerminalCategories";
import { GetInputAndOutputTerminalsByTerminalType } from "./helpers/GetInputAndOutputTerminalsByTerminalType";
import { GetNumTerminalsByCategory } from "./helpers/GetNumTerminalsByCategory";
import { TerminalCategory } from "../../../helpers/GetFilteredTerminalsList";
import { ConnectorDirection } from "@mimirorg/modelbuilder-types";

interface Props {
  terminals: TerminalLikeItem[];
  terminalCategories: TerminalCategory[];
  selectedTerminal: TerminalLikeItem;
  selectedTerminalIdentifier: SelectedTerminalIdentifier;
  onSelectTerminal: (identifier: SelectedTerminalIdentifier) => void;
}

export const ActiveTerminalsList = ({
  terminals,
  terminalCategories,
  selectedTerminal,
  selectedTerminalIdentifier,
  onSelectTerminal,
}: Props) => {
  const [expandedCategoriesIds, setExpandedCategoriesIds] = useState<string[]>(terminalCategories.map((cat) => cat.id));
  const [expandedTypesIds, setExpandedTypesIds] = useState<string[]>(
    terminalCategories
      .map((cat) => cat.items)
      .flat()
      .map((type) => [FormatTypeId(type, ConnectorDirection.Input), FormatTypeId(type, ConnectorDirection.Output)])
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

  const isCategoryExpanded = (category: any) => expandedCategoriesIds.includes(category.id);
  const isTypeExpanded = (type: TerminalType, connectorType: ConnectorDirection) =>
    expandedTypesIds.includes(FormatTypeId(type, connectorType));

  return (
    <ActiveTerminalListWrapper>
      {filteredCategories.map((category, i) => {
        const categoryExpanded = isCategoryExpanded(category);
        const numCategoryTerminals = numTerminalsByCategoryId.get(category.id);

        return (
          <TerminalsListElementWrapper key={category.id}>
            <TerminalsCategoryListElement
              selected={selectedTerminal?.terminalCategory === category.id}
              radius={0}
              onClick={() => OnCategoryClick(isCategoryExpanded(category), expandedCategoriesIds, setExpandedCategoriesIds)}
              color={i % 2 ? undefined : Color.LAVANDER_WEB_LIST}
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
                  onTypeClick: (type: TerminalType, connectorType: ConnectorDirection) =>
                    OnTypeClick(type, connectorType, isTypeExpanded(type, connectorType), expandedTypesIds, setExpandedTypesIds),
                  onSelectTerminal,
                };

                return (
                  <React.Fragment key={terminalType.id}>
                    {inputTerminals?.length > 0 && (
                      <ActiveTerminalsTypeList
                        {...terminalTypeListProps}
                        terminals={inputTerminals}
                        connectorType={ConnectorDirection.Input}
                        expanded={isTypeExpanded(terminalType, ConnectorDirection.Input)}
                      />
                    )}
                    {outputTerminals?.length > 0 && (
                      <ActiveTerminalsTypeList
                        {...terminalTypeListProps}
                        terminals={outputTerminals}
                        connectorType={ConnectorDirection.Output}
                        expanded={isTypeExpanded(terminalType, ConnectorDirection.Output)}
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
};

export default ActiveTerminalsList;
