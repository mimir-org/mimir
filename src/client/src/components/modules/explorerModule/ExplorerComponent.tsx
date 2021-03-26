import { projectData } from "./helpers/GetProjectData";
import { ExplorerIcon } from "../../../assets/";
import FacilityComponent from "./facilityComponent/FacilityComponent";
import textResources from "../../../textResources";

export const ExplorerComponent = () => {
  return (
    <div className="explorer_container">
      <div className="header">
        <img className="explorerIcon" src={ExplorerIcon} alt="explorerIcon" />
        <>{textResources.Explorer_view}</>
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
