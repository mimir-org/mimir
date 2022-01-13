import * as Click from "../../handlers";
import { ProjectItemCm } from "../../../../../models";
import { Dispatch } from "redux";
import { CreateProjectIcon, ImportProjectIcon } from "../../../../../assets/icons/project";
import { ProjectDescription, ProjectList, SearchBar } from ".";
import { Button } from "../../../../../compLibrary/buttons";
import { TextResources } from "../../../../../assets/text";
import { RightContainer, SearchProject } from "../styled";
import { ProjectDetailsBox, ProjectOptionsButtons } from "./styled";

interface Props {
  projects: ProjectItemCm[];
  projectDescription: string;
  dispatch: Dispatch;
}

/**
 * Component for ProjectDetails in the OpenProjectMenu.
 * @param interface
 * @returns the left column of the open project menu: a searchbar and projectslist
 */
export const ProjectDetails = ({ projects, dispatch }: Props) => (
  <ProjectDetailsBox>
    <SearchProject>
      <SearchBar />
      <ProjectList projectList={projects} dispatch={dispatch} />
    </SearchProject>
    <RightContainer>
      <ProjectOptionsButtons>
        <Button onClick={() => Click.OnCreate(dispatch)} text={TextResources.Project_Start_Label} icon={CreateProjectIcon} />
        <Button onClick={() => Click.OnImportProject(dispatch)} text={TextResources.Project_Import} icon={ImportProjectIcon} />
      </ProjectOptionsButtons>
      <ProjectDescription />
    </RightContainer>
  </ProjectDetailsBox>
);
export default ProjectDetails;
