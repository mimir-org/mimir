import { ProjectList } from "./ProjectList";
import { ProjectDescription } from "./ProjectDescription";
import { CreateProjectIcon, ImportProjectIcon } from "assets/icons/project";
import { Button } from "compLibrary/buttons/standard";
import { TextResources } from "assets/text/TextResources";
import { ProjectListItem } from "lib";
import {
  ProjectDetailsContainer,
  ProjectOptionsButtons,
  ProjectDetailsRightContainer,
  ProjectDetailsSearchContainer,
  SearchBarContainer,
  SearchBarInput,
} from "./Project.styled";

interface ProjectDetailsComponentProps {
  projects: ProjectListItem[];
  projectDescription: string;
  searchValue: string;
  onProjectItemClick: (id: string) => void;
  onSearchBarChange: (value: string) => void;
  onCreateClick: () => void;
  onImportProjectClick: () => void;
}

/**
 * Component for ProjectDetails in the OpenProjectMenu.
 * @param interface
 * @returns the left column of the open project menu: a searchbar and projectslist
 */
export const ProjectDetailsComponent = ({
  projects,
  projectDescription,
  searchValue,
  onProjectItemClick,
  onSearchBarChange,
  onCreateClick,
  onImportProjectClick,
}: ProjectDetailsComponentProps) => {
  return (
    <ProjectDetailsContainer>
      <ProjectDetailsSearchContainer>
        <SearchBarContainer>
          <SearchBarInput
            value={searchValue ?? ""}
            placeholder={TextResources.PROJECT_SEARCH}
            onChange={(e) => onSearchBarChange(e.target.value)}
            autoFocus
          />
        </SearchBarContainer>

        <ProjectList projectList={projects} onClick={onProjectItemClick} />
      </ProjectDetailsSearchContainer>
      <ProjectDetailsRightContainer>
        <ProjectOptionsButtons>
          <Button onClick={onCreateClick} text={TextResources.START_LABEL} icon={CreateProjectIcon} />
          <Button onClick={onImportProjectClick} text={TextResources.PROJECT_IMPORT} icon={ImportProjectIcon} />
        </ProjectOptionsButtons>
        <ProjectDescription description={projectDescription} />
      </ProjectDetailsRightContainer>
    </ProjectDetailsContainer>
  );
};

export default ProjectDetailsComponent;
