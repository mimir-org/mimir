import { ProjectData } from "./";
import { TextResources } from "../../../../../assets/text";
import { ProjectSimple } from "../../../../../models";
import { ProjectListBox, ProjectDataContainer, ProjectListLabels } from "./styled";

interface Props {
  projectList: ProjectSimple[];
}

export const ProjectList = ({ projectList }: Props) => (
  <ProjectListBox>
    <ProjectListLabels>
      <p className="name">{TextResources.Project_Recent_Name}</p>
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
          />
        );
      })}
    </ProjectDataContainer>
  </ProjectListBox>
);

export default ProjectList;
