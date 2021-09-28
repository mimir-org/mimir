import { useState, useEffect } from "react";
import { ExpandIcon, CollapseIcon } from "../../assets/icons/common";
import {
  SearchDropDownItem,
  SearchBarWrapper,
  SearchBarContainer,
  SearchBar,
  SearchBarList,
  SearchBarListItem,
} from "..";

interface Props {
  value?: string;
  placeHolder?: string;
  onChange: Function;
  list: SearchDropDownItem[];
}

const SearchDropDown = ({ value, placeHolder, list, onChange }: Props) => {
  const [isListOpen, setIsListOpen] = useState(false);
  const [searchString, setSearchString] = useState("");

  const filter =
    (searchString &&
      searchString.length > 0 &&
      list.filter(
        (x) =>
          x &&
          x.name &&
          x.name.toLowerCase().includes(searchString.toLowerCase())
      )) ||
    list;

  const valueChanged = (_e, id: string, name: string) => {
    value = id;
    setSearchString(name);
    setIsListOpen(false);
    onChange(value);
  };

  useEffect(() => {
    if (value) {
      const listItem = list.find((x) => x.id === value);
      setSearchString(listItem.name);
    }
  }, [value, list]);

  return (
    <SearchBarWrapper>
      <SearchBarContainer>
        <SearchBar>
          <label htmlFor="terminalsearch" />
          <input
            type="text"
            value={searchString}
            placeholder={placeHolder ?? ""}
            onChange={(e: any) => setSearchString(e.target.value)}
            onFocus={() => setIsListOpen(!isListOpen)}
          />
          <img
            src={isListOpen ? ExpandIcon : CollapseIcon}
            alt="expand-icon"
            onClick={() => {
              setIsListOpen(!isListOpen);
            }}
            className="icon"
          />
        </SearchBar>
        <SearchBarList>
          {isListOpen &&
            list &&
            filter.map((item) => {
              return (
                <SearchBarListItem
                  key={item.id}
                  onClick={(e: any) => valueChanged(e, item.id, item.name)}
                >
                  {item.name}
                </SearchBarListItem>
              );
            })}
        </SearchBarList>
      </SearchBarContainer>
    </SearchBarWrapper>
  );
};

export default SearchDropDown;
