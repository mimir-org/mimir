import { projectData } from "./helpers/GetProjectData";
import { ExplorerIcon } from "../../../assets";
import FacilityComponent from "./facilityComponent/FacilityComponent";
import textResources from "../../../textResources";
import { ToggleExplorerButton } from "../../../assets/buttons/index";
import AnimatedMenu from "./styled/animated/AnimatedMenu";
import {
  HeaderWrapper,
  IconWrapper,
  ContentWrapper,
  ExplorerTitle,
} from "./styled";
import { useState } from "react";
import {
  loadStateFromStorage,
  saveStateToStorage,
} from "../../../redux/store/localStorage/localStorage";

export const ExplorerModule = () => {
  const key = "explorer";
  const [isOpen, setIsOpen] = useState(loadStateFromStorage(key));

  const handleClick = () => {
    saveStateToStorage(!isOpen, key);
    setIsOpen(!isOpen);
  };
  const startHeight = isOpen ? "0" : "331";
  const stopHeight = isOpen ? "331" : "35";

  return (
    <AnimatedMenu start={startHeight} stop={stopHeight}>
      <HeaderWrapper>
        <IconWrapper>
          <ExplorerTitle>{textResources.Explorer_view}</ExplorerTitle>
          <img src={ExplorerIcon} alt="explorerIcon" />
        </IconWrapper>
        <ToggleExplorerButton visible={isOpen} onClick={handleClick} />
      </HeaderWrapper>
      <ContentWrapper>
        <FacilityComponent
          name={projectData[0].name}
          id={projectData[0].id}
          aspect={projectData[0].aspect}
        />
      </ContentWrapper>
    </AnimatedMenu>
  );
};

export default ExplorerModule;
