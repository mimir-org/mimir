import { OpenProjectHeader } from "./header";
import { SearchBarComponent } from "./searchBar";
import { RecentProjectsList } from "./recentProjectsList";
import { OpenProjectButton } from "./openProjectButton";

export const EarlierProjectComponent = () => {
  return (
    <div className="open_project_container">
      <div className="open_project_content">
        <OpenProjectHeader />
        <SearchBarComponent />
        <RecentProjectsList />
        <OpenProjectButton />
      </div>
    </div>
  );
};

export default EarlierProjectComponent;
