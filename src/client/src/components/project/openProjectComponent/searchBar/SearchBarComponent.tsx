import { useState } from "react";
import { useDispatch } from "react-redux";
import { search } from "../../../../redux/store/project/actions";
import GetImg from "../../helpers/GetImg";

export let SearchBarComponent = () => {
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
      <GetImg icon="SearchIcon" />
    </div>
  );
};

export default SearchBarComponent;
