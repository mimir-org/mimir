import { projectData } from "./helpers/GetProjectData";
import { ExplorerIcon } from "../../../assets";
import FacilityComponent from "./facilityComponent/FacilityComponent";
import textResources from "../../../textResources";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { ToggleExplorerButton } from "../../../assets/buttons/index";
import useLibraryToggleChangeHandler from "../libraryModule/hooks/useLibraryToggleChangeHandler";

export const ExplorerModule = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector<RootState>(
    (state) => state.showLibraryReducer.visible
  );
  const handleClick = useLibraryToggleChangeHandler(dispatch, isOpen);

  const startHeight = isOpen ? "0" : "331";
  const stopHeight = isOpen ? "331" : "35";

  return (
    <div className="explorer_view">
      <div className="explorer_container">
        <div className="header">
          <img className="explorerIcon" src={ExplorerIcon} alt="explorerIcon" />
          <>{textResources.Explorer_view}</>
          <ToggleExplorerButton visible={isOpen} onClick={handleClick} />
        </div>
        <div className="scrollable_container">
          <FacilityComponent
            name={projectData[0].name}
            id={projectData[0].id}
            aspect={projectData[0].aspect}
          />
        </div>
      </div>
    </div>
  );
};

export default ExplorerModule;
