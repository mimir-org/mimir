import { useState } from "react";
// import { search } from "../../../../../../../redux/store/project/actions";
import { useAppDispatch } from "store";
import { SearchBarContainer, SearchBarInput } from "./ProjectSearchBarComponent.styled";
import { TextResources } from "../../../../../../../assets/text/TextResources";

export const ProjectSearchBarComponent = () => {
  const dispatch = useAppDispatch();
  const [searchbarInput, setSearchbarInput] = useState("");

  const onChange = (e) => {
    setSearchbarInput(e.target.value);
    // dispatch(search(e.target.value));
  };

  return (
    <SearchBarContainer>
      <SearchBarInput value={searchbarInput} placeholder={TextResources.PROJECT_SEARCH} onChange={onChange} autoFocus />
    </SearchBarContainer>
  );
};

export default ProjectSearchBarComponent;
