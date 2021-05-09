import { useSelector } from "react-redux";
import { RootState } from "./../../../../redux/store/index";
import { ProjectSimple } from "../../../../models/project";
import { ProjectData } from "./projectData";
import textResources from "../../../../textResources";

export const RecentProjectsListComponent = () => {
  const projectList = useSelector<RootState>(
    (state) => state.projectState.projectList
  ) as ProjectSimple[];

  return (
    <div className="project_list">
      <p className="recent_projects_text">
        {textResources.Project_recent_project}
      </p>
      <div className="project_list_labels">
        <p className="project_name">{textResources.Project_recent_name}</p>
        <p className="project_owner">{textResources.Project_recent_owner}</p>
        <p className="last_edited">{textResources.Project_recent_edited}</p>
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

export default RecentProjectsListComponent;
