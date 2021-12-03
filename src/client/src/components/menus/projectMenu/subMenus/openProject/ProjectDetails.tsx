import { ProjectSimple } from "../../../../../models";
import { Dispatch } from "redux";
import * as Click from "../../handlers";
import { CreateProjectIcon } from "../../../../../assets/icons/project";
import { SearchBar, ProjectList, ProjectDescription } from "./";
import { Button } from "../../../../../compLibrary/buttons";
import { TextResources } from "../../../../../assets/text";
import { Details, SearchProject, RightContainer } from "../styled";

interface Props {
  projects: ProjectSimple[];
  projectDescription: string;
  dispatch: Dispatch;
}

/**
 * Component for Open project menu.
 * @returns the left column of the open project menu: a searchbar and projectslist
 */

export const ProjectDetails = ({ projects, projectDescription, dispatch }: Props) => (
  <Details>
    <SearchProject>
      <SearchBar />
      <ProjectList projectList={projects} />
    </SearchProject>
    <RightContainer>
      <Button
        onClick={() => Click.OnCreate(dispatch)}
        text={TextResources.Project_Start_Label}
        icon={CreateProjectIcon}
        iconOnLeft={true}
      />
      <ProjectDescription description={projectDescription} />
    </RightContainer>
  </Details>
);
export default ProjectDetails;
