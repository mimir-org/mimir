import { useState, useEffect } from "react";
import { ExpandIcon, CollapseIcon } from "../../assets/icons/chevron";
import { AttributeType } from "../../models";
import { SearchBarContainer, SearchBar, SearchBarList, SearchBarListItem } from "..";

interface Props {
  value?: string;
  placeHolder?: string;
  onChange: Function;
  list: SearchDropDownItem[];
}

export interface SearchDropDownItem {
  id: string;
  name: string;
  attributes: AttributeType[];
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

  const valueChanged = (item) => {
    setSearchString(item.name);
    setIsListOpen(false);
    onChange(item);
  };

  const showListItems = () => {
    const filteredList = isInArray ? list : filter;
    return filteredList.map((item) => {
      return (
        <SearchBarListItem key={item.id} onClick={() => valueChanged(item)}>
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
  );
};

export default SearchDropDown;
