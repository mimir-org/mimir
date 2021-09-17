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
} from "../../../../../compLibrary/dropdown/";
import {
  HelpIcon,
  ExpandIcon,
  CollapseIcon,
} from "../../../../../assets/icons/common";
import { TextResources } from "../../../../../assets/text";

interface Props {
  categoryName: string;
  terminalTypes: TerminalType[];
  onChange: Function;
  defaultTerminal?: TerminalType;
}

export const TransportInterfaceElement = ({
  categoryName,
  terminalTypes,
  onChange,
  defaultTerminal,
}: Props) => {
  const [selectedCategory, setselectedCategory] = useState(
    defaultTerminal ? defaultTerminal.terminalCategory.name : ""
  );
  const [searchbarInput, setSearchbarInput] = useState(
    defaultTerminal ? defaultTerminal.name : ""
  );
  const [expandList, setExpandList] = useState(false);

  const handleTerminalClick = (terminal) => {
    setSearchbarInput(terminal.name);
    onChange("terminalTypeId", terminal.id);
    setExpandList(!expandList);
  };

  const handleChange = (e) => {
    setSearchbarInput(e.target.value.toLowerCase());
  };

  return (
    <TerminalListElement>
      <TerminalCategoryWrapper>
        <div onClick={() => setselectedCategory(categoryName)}>
          <RoundCheckbox
            id={categoryName}
            listType={ListType.Terminals}
            defaultValue={defaultTerminal?.terminalCategory.name}
            onChange={setselectedCategory}
          />
        </div>
        <p className="category">{categoryName}</p>
        {categoryName === selectedCategory && (
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
                    .filter((t) =>
                      t.name.match(new RegExp(searchbarInput, "i"))
                    )
                    .map((t) => {
                      return (
                        <SearchBarListItem
                          key={t.id}
                          onClick={() => {
                            handleTerminalClick(t);
                          }}
                        >
                          {t.name}
                        </SearchBarListItem>
                      );
                    })}
                </SearchBarList>
              )}
            </SearchBarContainer>
            <img className="helpIcon" src={HelpIcon} alt="help" />
          </SearchBarWrapper>
        )}
      </TerminalCategoryWrapper>
    </TerminalListElement>
  );
};

export default TransportInterfaceElement;
