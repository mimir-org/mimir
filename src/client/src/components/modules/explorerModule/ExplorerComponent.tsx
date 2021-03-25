import { projectData } from "./helpers/GetProjectData";
import explorerIcon from "../../../assets/icons/explorer.svg";
import explorerExpanded from "../../../assets/icons/explorerExpanded.svg";
import FacilityComponent from "./facilityComponent/FacilityComponent";

export const ExplorerComponent = () => {
  return (
    <div className="explorer_container">
      <div className="header">
        <img className="explorerIcon" src={explorerIcon} alt="explorerIcon" />
        <>Explorer</>
        <img
          className="expand_icon"
          src={explorerExpanded}
          alt="expandedIcon"
        />
      </div>
      <div className="scrollable_container">
        <FacilityComponent
          name={projectData[0].name}
          id={projectData[0].id}
          aspect={projectData[0].aspect}
        />
      </div>
    </div>
  );
};

export default ExplorerComponent;
