import { Dispatch } from "redux";
import { ProjectData } from "./";
import { ProjectItemCm } from "../../../../../models";
import { ProjectListBox, ProjectDataContainer, ProjectListLabels } from "./styled";
import { TextResources } from "../../../../../assets/text";
interface Props {
  projectList: ProjectItemCm[];
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
