import "./searchbar.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { search } from "../../../redux/store/project/actions";
import { GetIcon } from "../helpers";

export const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchbarInput, setSearchbarInput] = useState("");

  const onChange = (e) => {
    setSearchbarInput(e.target.value);
    dispatch(search(e.target.value));
  };

  return (
    <div className="searchbar_container">
      <label htmlFor="search" />
      <input
        type="text"
        value={searchbarInput}
        placeholder="Search projects"
        onChange={onChange}
        autoFocus
      />
      <GetIcon icon="SearchIcon" />
    </div>
  );
};

export default SearchBar;
