import { useState } from "react";
import { SearchBarContainer, SearchBarInput } from "./ProjectSearchBarComponent.styled";
import { TextResources } from "../../../../../../../assets/text/TextResources";

export const ProjectSearchBarComponent = () => {
  const [searchbarInput, setSearchbarInput] = useState("");

  const onChange = (e) => {
    setSearchbarInput(e.target.value);
  };

  return (
    <SearchBarContainer>
      <SearchBarInput value={searchbarInput} placeholder={TextResources.PROJECT_SEARCH} onChange={onChange} autoFocus />
    </SearchBarContainer>
  );
};

export default ProjectSearchBarComponent;
