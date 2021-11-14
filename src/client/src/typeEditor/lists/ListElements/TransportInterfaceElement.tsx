import { useState } from "react";
import { ConnectorType, TerminalType, TerminalTypeItem } from "../../../models";
import { ListType, RadioButtonContainer } from "../../inputs/RadioButtonContainer";
import { TerminalListElement, TerminalCategoryWrapper } from "../../styled";
import { ExpandIcon, CollapseIcon } from "../../../assets/icons/chevron";
import { TextResources } from "../../../assets/text";
import { SearchBarWrapper, SearchBarContainer, SearchBar, SearchBarList, SearchBarListItem } from "../../../compLibrary/";
import { CreateId } from "../../../components/flow/helpers";
import { OnPropertyChangeFunction, OnTerminalCategoryChangeFunction } from "../../types";

interface Props {
  categoryName: string;
  terminalTypes: TerminalType[];
  onPropertyChange: OnPropertyChangeFunction;
  onTerminalCategoryChange: OnTerminalCategoryChangeFunction;
  defaultTerminal?: TerminalType;
}

export const TransportInterfaceElement = ({
  categoryName,
  terminalTypes,
  onPropertyChange,
  onTerminalCategoryChange,
  defaultTerminal,
}: Props) => {
  const [searchbarInput, setSearchbarInput] = useState(defaultTerminal ? defaultTerminal.name : "");
  const [expandList, setExpandList] = useState(false);
  const filter = terminalTypes?.filter((t) => t.name.match(new RegExp(searchbarInput, "i")));

  const defaultTerminalItem = {
    terminalId: CreateId(),
    terminalTypeId: "",
    selected: false,
    connectorType: ConnectorType.Input,
    number: 1,
    categoryId: defaultTerminal?.terminalCategoryId,
  } as TerminalTypeItem;

  const handleTerminalClick = (terminal: TerminalType) => {
    setSearchbarInput(terminal.name);

    defaultTerminalItem.terminalTypeId = terminal.id;
    defaultTerminalItem.categoryId = terminal.terminalCategoryId;

    onTerminalCategoryChange("terminalTypeId", defaultTerminalItem);
    setExpandList(!expandList);
  };

  const handleChange = (e) => {
    setSearchbarInput(e.target.value.toLowerCase());
  };

  const isSelected = () => {
    let selected = false;
    terminalTypes.forEach((t) => {
      if (t.id === defaultTerminal?.id) {
        selected = true;
      }
    });
    return selected;
  };

  const showListItems = () => {
    const isInArray = terminalTypes.find((t) => t.name === searchbarInput);
    const filteredList = isInArray ? terminalTypes : filter;
    return filteredList.map((t) => {
      return (
        <SearchBarListItem
          key={t.id}
          onClick={() => {
            handleTerminalClick(t);
          }}
        >
          <p>{t.name}</p>
        </SearchBarListItem>
      );
    });
  };

  return (
    <TerminalListElement>
      <TerminalCategoryWrapper isSelected={isSelected()}>
        <RadioButtonContainer
          id={categoryName}
          label={categoryName}
          listType={ListType.Terminals}
          checked={isSelected()}
          defaultValue={terminalTypes[0].id}
          onChange={(key, terminalTypeId) => onPropertyChange(key, terminalTypeId)}
        />
        {isSelected() && (
          <SearchBarWrapper>
            <SearchBarContainer>
              <SearchBar>
                <label htmlFor="terminalsearch" />
                <input
                  type="text"
                  value={searchbarInput}
                  placeholder={TextResources.TypeEditor_Search}
                  onChange={handleChange}
                  onFocus={() => setExpandList(!expandList)}
                />
                <img
                  src={expandList ? ExpandIcon : CollapseIcon}
                  alt="expand-icon"
                  onClick={() => setExpandList(!expandList)}
                  onFocus={() => setExpandList(!expandList)}
                  className="icon"
                />
              </SearchBar>
              {expandList && <SearchBarList>{showListItems()}</SearchBarList>}
            </SearchBarContainer>
          </SearchBarWrapper>
        )}
      </TerminalCategoryWrapper>
    </TerminalListElement>
  );
};

export default TransportInterfaceElement;
