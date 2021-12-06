import { useState } from "react";
import { search } from "../../../../../redux/store/project/actions";
import { useAppDispatch } from "../../../../../redux/store";
import { SearchBarBox } from "./styled";
import { TextResources } from "../../../../../assets/text";

export const SearchBar = () => {
  const dispatch = useAppDispatch();
  const [searchbarInput, setSearchbarInput] = useState("");

  const onChange = (e) => {
    setSearchbarInput(e.target.value);
    dispatch(search(e.target.value));
  };

  return (
    <SearchBarBox>
      <label htmlFor="search" />
      <input
        type="text"
        value={searchbarInput}
        placeholder={TextResources.Project_Search_Placeholder}
        onChange={onChange}
        autoFocus
      />
    </SearchBarBox>
  );
};

export default SearchBar;
