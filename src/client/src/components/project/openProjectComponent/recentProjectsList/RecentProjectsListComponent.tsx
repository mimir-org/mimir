import { useSelector } from "react-redux";
import { RootState } from "./../../../../redux/store/index";
import { ProjectSimple } from "../../../../models/project";
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
          console.log("test");
          console.log("La oss logge projectlist[0]", projectList[0]);
          return (
            <div key={project.id} className="project_list_data">
              <p className="project_name_data">{project.name}</p>
              <p className="project_owner_data">{project.projectOwner}</p>
              <p className="last_edited">{project.lastEdited}</p>
            </div>
          );
        })}
    </div>
  );
};

export default RecentProjectsListComponent;
