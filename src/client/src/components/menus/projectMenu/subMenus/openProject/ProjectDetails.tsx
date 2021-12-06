import * as Click from "../../handlers";
import { ProjectItemCm } from "../../../../../models";
import { Dispatch } from "redux";
import { CreateProjectIcon } from "../../../../../assets/icons/project";
import { SearchBar, ProjectList, ProjectDescription } from ".";
import { Button } from "../../../../../compLibrary/buttons";
import { TextResources } from "../../../../../assets/text";
import { SearchProject, RightContainer } from "../styled";
import { ProjectDetailsBox } from "./styled";

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
export const ProjectDetails = ({ projects, projectDescription, dispatch }: Props) => (
  <ProjectDetailsBox>
    <SearchProject>
      <SearchBar />
      <ProjectList projectList={projects} dispatch={dispatch} />
    </SearchProject>
    <RightContainer>
      <Button
        onClick={() => Click.OnCreate(dispatch)}
        text={TextResources.Project_Start_Label}
        icon={CreateProjectIcon}
        iconLeft
      />
      <ProjectDescription description={projectDescription} />
    </RightContainer>
  </ProjectDetailsBox>
);
export default ProjectDetails;
