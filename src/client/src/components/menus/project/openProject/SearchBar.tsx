import "./searchbar.scss";
import { useState } from "react";
import { search } from "../../../../redux/store/project/actions";
import { GetIcon } from "../helpers";
import { useAppDispatch } from "../../../../redux/store";

export const SearchBar = () => {
  const dispatch = useAppDispatch();
  const [searchbarInput, setSearchbarInput] = useState("");

  const onChange = (e) => {
    setSearchbarInput(e.target.value);
    dispatch(search(e.target.value));
  };

  return (
    <div className="searchbar_container">
      <label htmlFor="search" />
      <input type="text" value={searchbarInput} placeholder="Search projects" onChange={onChange} autoFocus />
      <GetIcon icon="SearchIcon" />
    </div>
  );
};

export default SearchBar;
