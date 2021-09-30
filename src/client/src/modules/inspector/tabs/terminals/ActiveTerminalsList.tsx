import { Color } from "../../../../compLibrary";
import { TerminalCategory } from "../../../../components/modules/typeEditorModule/helpers/GetFilteredTerminalsList";
import { Connector, ConnectorType, TerminalType } from "../../../../models";
import { ListElement } from "../../styled";
import { useState } from "react";
import {
  TerminalTypeListElement,
  TerminalsListElementWrapper,
  TerminalListElement,
} from "./styled/activeTerminalList";
import {
  ExpandAccordionIcon,
  CollapseAccordionIcon,
  ExpandAccordionNestedIcon,
  CollapseAccordionNestedIcon,
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

  const isCategoryExpanded = (category: TerminalCategory) =>
    selectedCategoriesIds.includes(category.id);

  const isTypeExpanded = (type: TerminalType) =>
    selectedTypesIds.includes(type.id);

  const onCategoryClick = (category: TerminalCategory) => {
    if (isCategoryExpanded(category)) {
      setSelectedCategoriesIds(
        selectedCategoriesIds.filter((id) => id !== category.id)
      );
    } else {
      setSelectedCategoriesIds([...selectedCategoriesIds, category.id]);
    }
  };

  const onTypeClick = (type: TerminalType) => {
    if (isTypeExpanded(type)) {
      setSelectedTypesIds(selectedTypesIds.filter((id) => id !== type.id));
    } else {
      setSelectedTypesIds([...selectedTypesIds, type.id]);
    }
  };

  const selectedTerminal = terminals.find(
    (term) => term.id === selectedTerminalId
  );

  return (
    <div>
      {filteredCategories.map((category, i) => {
        const categorySelected = isCategoryExpanded(category);

        return (
          <TerminalsListElementWrapper key={category.id}>
            <ListElement
              isSelected={selectedTerminal?.terminalCategoryId === category.id}
              radius={0}
              onClick={() => onCategoryClick(category)}
              index={i}
              color={i % 2 ? undefined : Color.LightPurple}
            >
              {category.name}
              <img
                src={
                  categorySelected ? ExpandAccordionIcon : CollapseAccordionIcon
                }
                className="dropdownIcon"
                alt="expand-icon"
              />
            </ListElement>
            {categorySelected &&
              category.items.map((terminalType) => {
                const typeSelected = isTypeExpanded(terminalType);
                return (
                  <TerminalsListElementWrapper key={terminalType.id}>
                    <TerminalTypeListElement
                      onClick={() => onTypeClick(terminalType)}
                      isSelected={
                        selectedTerminal?.terminalTypeId === terminalType.id
                      }
                    >
                      {terminalType.name}
                      <img
                        src={
                          typeSelected
                            ? ExpandAccordionNestedIcon
                            : CollapseAccordionNestedIcon
                        }
                        className="dropdownIcon"
                        alt="expand-icon"
                      />
                    </TerminalTypeListElement>
                    {typeSelected &&
                      terminals
                        .filter(
                          (term) => term.terminalTypeId === terminalType.id
                        )
                        .map((terminal) => (
                          <TerminalListElement
                            key={terminal.id}
                            isSelected={selectedTerminal?.id === terminal.id}
                            onClick={() => onSelectTerminal(terminal)}
                          >
                            {`${terminal.name} [${ConnectorType[
                              terminal.type
                            ].toLowerCase()}]`}
                          </TerminalListElement>
                        ))}
                  </TerminalsListElementWrapper>
                );
              })}
          </TerminalsListElementWrapper>
        );
      })}
    </div>
  );
}

export default ActiveTerminalsList;
