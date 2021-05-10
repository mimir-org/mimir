import { OpenProjectHeader } from "./header";
import { SearchBarComponent } from "./searchBar";
import { ProjectList } from "./projectList";
import { OpenProjectButton } from "./openProjectButton";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { ProjectSimple } from "../../../models/project";
import { LeftArrowIcon } from "../../../assets/icons";
import { useState } from "react";
import { ProjectOptions } from "..";

export const OpenProjectComponent = ({ visible }) => {
  const projects = useSelector<RootState>(
    (state) => state.projectState.projectList
  ) as ProjectSimple[];

  const [isOpen, setIsOpen] = useState(visible);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const project =
    projects !== null ? projects.find((x) => x.selected === true) : undefined;
  const projectId = project ? project.id : undefined;

  return isOpen ? (
    <div className="open_project_container">
      <div className="open_project_content">
        <img
          src={LeftArrowIcon}
          alt="icon"
          className="back_icon"
          onClick={handleClick}
        />
        <SearchBarComponent />
        <ProjectList />
        <OpenProjectButton projectId={projectId} />
      </div>
    </div>
  ) : (
    <div style={{ zIndex: 100 }}>
      <ProjectOptions />
    </div>
  );
};

export default OpenProjectComponent;
