import { ProjectData } from "./";
import { TextResources } from "../../../../../assets/text";
import { ProjectSimple } from "../../../../../models";
import { ProjectListBox, ProjectListLabels } from "./styled";

interface Props {
  projectList: ProjectSimple[];
}

export const ProjectList = ({ projectList }: Props) => (
  <ProjectListBox>
    <p className="text">{TextResources.Project_Recent}</p>
    <ProjectListLabels>
      <p className="name">{TextResources.Project_Recent_Name}</p>
      <p className="owner">{TextResources.Project_Recent_Owner}</p>
      <p className="edited">{TextResources.Project_Recent_Edited}</p>
    </ProjectListLabels>
    {projectList?.map((project) => {
      return (
        <ProjectData
          key={project.id}
          projects={projectList}
          projectId={project.id}
          projectName={project.name}
          projectOwner={project.projectOwner}
          updated={project.updated}
        />
      );
    })}
  </ProjectListBox>
);

export default ProjectList;
