import { useState } from "react";
import { TerminalType } from "../../../../../models";
import { ListType, RoundCheckbox } from "../../inputs/RoundCheckbox";
import { TerminalListElement, TerminalCategoryWrapper } from "../../styled";
import {
  SearchBarWrapper,
  SearchBarContainer,
  SearchBar,
  SearchBarList,
  SearchBarListItem,
} from "../../../../../compLibrary/";
import { ExpandIcon, CollapseIcon } from "../../../../../assets/icons/common";
import { TextResources } from "../../../../../assets/text";

interface Props {
  categoryName: string;
  terminalTypes: TerminalType[];
  onChange: Function;
  defaultTerminal?: TerminalType;
}

export const TransportInterfaceElement = ({ categoryName, terminalTypes, onChange, defaultTerminal }: Props) => {
  const [searchbarInput, setSearchbarInput] = useState(defaultTerminal ? defaultTerminal.name : "");
  const [expandList, setExpandList] = useState(false);

  const handleTerminalClick = (terminal) => {
    setSearchbarInput(terminal.name);
    onChange("terminalTypeId", terminal.id);
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

  return (
    <TerminalListElement>
      <TerminalCategoryWrapper isSelected={isSelected()}>
        <RoundCheckbox
          id={categoryName}
          label={categoryName}
          listType={ListType.Terminals}
          checked={isSelected()}
          defaultValue={terminalTypes[0].id}
          onChange={onChange}
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
              {expandList && (
                <SearchBarList>
                  {terminalTypes
                    .filter((t) => t.name.match(new RegExp(searchbarInput, "i")))
                    .map((t) => {
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
                    })}
                </SearchBarList>
              )}
            </SearchBarContainer>
          </SearchBarWrapper>
        )}
      </TerminalCategoryWrapper>
    </TerminalListElement>
  );
};

export default TransportInterfaceElement;
