import * as Click from "../../../../handlers";
import { ProjectList } from "./ProjectList";
import { SearchBar } from "./SearchBar";
import { ProjectDescription } from "./ProjectDescription";
import { ProjectItemCm } from "../../../../../../../models";
import { CreateProjectIcon, ImportProjectIcon } from "../../../../../../../assets/icons/project";
import { Button } from "../../../../../../../compLibrary/buttons/standar";
import { TextResources } from "../../../../../../../assets/text/TextResources";
import { useAppDispatch } from "../../../../../../../redux/store";
import {
  ProjectDetailsContainer,
  ProjectOptionsButtons,
  ProjectDetailsRightContainer,
  ProjectDetailsSearchContainer,
} from "./ProjectDetails.styled";

interface Props {
  projects: ProjectItemCm[];
  projectDescription: string;
}

/**
 * Component for ProjectDetails in the OpenProjectMenu.
 * @param interface
 * @returns the left column of the open project menu: a searchbar and projectslist
 */
export const ProjectDetails = ({ projects }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <ProjectDetailsContainer>
      <ProjectDetailsSearchContainer>
        <SearchBar />
        <ProjectList projectList={projects} dispatch={dispatch} />
      </ProjectDetailsSearchContainer>
      <ProjectDetailsRightContainer>
        <ProjectOptionsButtons>
          <Button onClick={() => Click.OnCreateClick(dispatch)} text={TextResources.START_LABEL} icon={CreateProjectIcon} />
          <Button
            onClick={() => Click.OnImportProjectFile(dispatch)}
            text={TextResources.PROJECT_IMPORT}
            icon={ImportProjectIcon}
          />
        </ProjectOptionsButtons>
        <ProjectDescription />
      </ProjectDetailsRightContainer>
    </ProjectDetailsContainer>
  );
};

export default ProjectDetails;
