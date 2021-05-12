import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/index";
import { ProjectSimple } from "../../../models/project";
import { ProjectData } from "./";
import { TextResources } from "../../../assets/textResources";
import "./projectlist.scss";

export const ProjectList = () => {
  const projectList = useSelector<RootState>(
    (state) => state.projectState.projectList
  ) as ProjectSimple[];

  return (
    <div className="project_list">
      <p className="recent_projects_text">
        {TextResources.Project_recent_project}
      </p>
      <div className="project_list_labels">
        <p className="project_name">{TextResources.Project_recent_name}</p>
        <p className="project_owner">{TextResources.Project_recent_owner}</p>
        <p className="last_edited">{TextResources.Project_recent_edited}</p>
      </div>
      {projectList &&
        projectList.map((project) => {
          return (
            <ProjectData
              key={project.id}
              projectId={project.id}
              projectName={project.name}
              projectOwner={project.projectOwner}
              updated={project.updated}
            />
          );
        })}
    </div>
  );
};

export default ProjectList;