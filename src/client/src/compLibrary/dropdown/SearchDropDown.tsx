import { useState, useEffect } from "react";
import { ExpandIcon, CollapseIcon } from "../../assets/icons/chevron";
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
  const isInArray = list.find((x) => x.name === searchString);

  const filter =
    (searchString &&
      searchString.length > 0 &&
      list.filter((x) => x && x.name && x.name.toLowerCase().includes(searchString.toLowerCase()))) ||
    list;

  const valueChanged = (_e, id: string, name: string) => {
    value = id;
    setSearchString(name);
    setIsListOpen(false);
    onChange(value);
  };

  const showListItems = () => {
    const filteredList = isInArray ? list : filter;
    return filteredList.map((item) => {
      return (
        <SearchBarListItem key={item.id} onClick={(e: any) => valueChanged(e, item.id, item.name)}>
          <p>{item.name}</p>
        </SearchBarListItem>
      );
    });
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
        {isListOpen && list && <SearchBarList>{showListItems()}</SearchBarList>}
      </SearchBarContainer>
    </SearchBarWrapper>
  );
};

export default SearchDropDown;
