import "./projectlist.scss";
import { ProjectData } from "./";
import { TextResources } from "../../../../../assets/text";
import { ProjectSimple } from "../../../../../models";

interface Props {
  projectList: ProjectSimple[];
}

export const ProjectList = ({ projectList }: Props) => (
  <div className="project_list">
    <p className="recent_projects_text">{TextResources.Project_Recent}</p>
    <div className="project_list_labels">
      <p className="project_name">{TextResources.Project_Recent_Name}</p>
      <p className="project_owner">{TextResources.Project_Recent_Owner}</p>
      <p className="last_edited">{TextResources.Project_Recent_Edited}</p>
    </div>
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
  </div>
);

export default ProjectList;
