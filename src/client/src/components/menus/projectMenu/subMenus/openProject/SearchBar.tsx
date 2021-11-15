import { useState } from "react";
import { search } from "../../../../../redux/store/project/actions";
import { useAppDispatch } from "../../../../../redux/store";
import { SearchIcon } from "../../../../../assets/icons/common";
import { SearchBarBox } from "./styled";

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
      <input type="text" value={searchbarInput} placeholder="Search projects" onChange={onChange} autoFocus />
      <img src={SearchIcon} alt="search-icon" />
    </SearchBarBox>
  );
};

export default SearchBar;
