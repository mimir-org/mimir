import { projectData } from "./helpers/GetProjectData";
import { ExplorerIcon } from "../../../assets";
import FacilityComponent from "./facilityComponent/FacilityComponent";
import textResources from "../../../textResources";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { ToggleExplorerButton } from "../../../assets/buttons/index";
import AnimatedMenu from "./styled/animated/AnimatedMenu";
import useExplorerToggleChangeHandler from "../explorerModule/hooks/useExplorerToggleChangeHandler";
import { ExplorerContainer, HeaderWrapper } from "./styled";

export const ExplorerModule = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector<RootState>(
    (state) => state.showExplorerReducer.visible
  );

  const handleClick = useExplorerToggleChangeHandler(dispatch, isOpen);

  const startHeight = isOpen ? "0" : "331";
  const stopHeight = isOpen ? "331" : "35";

  return (
    <>
      <ExplorerContainer stop={stopHeight}>
        <HeaderWrapper>
          <img className="explorerIcon" src={ExplorerIcon} alt="explorerIcon" />
          {textResources.Explorer_view}
          <ToggleExplorerButton visible={isOpen} onClick={handleClick} />
        </HeaderWrapper>
        <div className="scrollable_container">
          <FacilityComponent
            name={projectData[0].name}
            id={projectData[0].id}
            aspect={projectData[0].aspect}
          />
        </div>
      </ExplorerContainer>
    </>
  );
};

export default ExplorerModule;
