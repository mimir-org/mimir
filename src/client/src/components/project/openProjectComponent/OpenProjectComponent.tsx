import { OpenProjectHeader } from "./header";
import { SearchBarComponent } from "./searchBar";
import { RecentProjectsList } from "./recentProjectsList";
import { OpenProjectButton } from "./openProjectButton";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { ProjectSimple } from "../../../models/project";

export const EarlierProjectComponent = () => {
  const projects = useSelector<RootState>(
    (state) => state.projectState.projectList
  ) as ProjectSimple[];

  const project =
    projects !== null ? projects.find((x) => x.selected === true) : "";
  const projectId = project ? project.id : "";

  return (
    <div className="open_project_container">
      <div className="open_project_content">
        <OpenProjectHeader />
        <SearchBarComponent />
        <RecentProjectsList />
        <OpenProjectButton projectId={projectId} />
      </div>
    </div>
  );
};

export default EarlierProjectComponent;
