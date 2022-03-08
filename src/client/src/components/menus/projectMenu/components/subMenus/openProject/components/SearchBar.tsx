import { useState } from "react";
import { search } from "../../../../../../../redux/store/project/actions";
import { useAppDispatch } from "../../../../../../../redux/store";
import { SearchBarContainer, SearchBarInput } from "./SearchBar.styled";
import { TextResources } from "../../../../../../../assets/text";

export const SearchBar = () => {
  const dispatch = useAppDispatch();
  const [searchbarInput, setSearchbarInput] = useState("");

  const onChange = (e) => {
    setSearchbarInput(e.target.value);
    dispatch(search(e.target.value));
  };

  return (
    <SearchBarContainer>
      <SearchBarInput
        value={searchbarInput}
        placeholder={TextResources.Project_Search_Placeholder}
        onChange={onChange}
        autoFocus
      />
    </SearchBarContainer>
  );
};

export default SearchBar;
