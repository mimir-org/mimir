import { useState } from "react";
import { useDispatch } from "react-redux";
import { search } from "../../../redux/store/project/actions";
import { GetIcon } from "../helpers";
import "./searchbar.scss";

export let SearchBar = () => {
  const dispatch = useDispatch();

  const [searchbarInput, setsearchbarInput] = useState("");

  const handleChange = (e) => {
    setsearchbarInput(e.target.value);
    dispatch(search(e.target.value));
  };

  return (
    <div className="searchbar_container">
      <label htmlFor="search" />
      <input
        type="text"
        value={searchbarInput}
        placeholder="Search projects"
        onChange={handleChange}
        autoFocus
      />
      <GetIcon icon="SearchIcon" />
    </div>
  );
};

export default SearchBar;
