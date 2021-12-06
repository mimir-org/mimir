import { Dispatch } from "redux";
import { ProjectData } from "./";
import { ProjectSimple } from "../../../../../models";
import { TextResources } from "../../../../../assets/text";
import { ProjectListBox, ProjectDataContainer, ProjectListLabels } from "./styled";

interface Props {
  projectList: ProjectSimple[];
  dispatch: Dispatch;
}

export const ProjectList = ({ projectList, dispatch }: Props) => (
  <ProjectListBox>
    <ProjectListLabels>
      <p className="name">{TextResources.Project}</p>
      <p className="owner">{TextResources.Project_Recent_Owner}</p>
      <p className="version">{TextResources.Project_Recent_Version}</p>
      <p className="edited">{TextResources.Project_Recent_Edited}</p>
    </ProjectListLabels>
    <ProjectDataContainer>
      {projectList?.map((project) => {
        return (
          <ProjectData
            key={project.id}
            projects={projectList}
            projectId={project.id}
            projectName={project.name}
            projectOwner={project.projectOwner}
            projectVersion={project.version}
            updated={project.updated}
            dispatch={dispatch}
          />
        );
      })}
    </ProjectDataContainer>
  </ProjectListBox>
);

export default ProjectList;
