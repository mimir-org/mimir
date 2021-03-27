import { projectData } from "./helpers/GetProjectData";
import { ExplorerIcon } from "../../../assets";
import FacilityComponent from "./facilityComponent/FacilityComponent";
import textResources from "../../../textResources";
import { ToggleExplorerButton } from "../../../assets/buttons/index";
import AnimatedMenu from "./styled/animated/AnimatedMenu";
import { HeaderWrapper, Header, ContentWrapper } from "./styled";
import { useState } from "react";
import {
  loadStateFromStorage,
  saveStateToStorage,
} from "../../../redux/store/localStorage/localStorage";

export const ExplorerModule = () => {
  const module = "explorer";
  const [isOpen, setIsOpen] = useState(loadStateFromStorage(module));

  const handleClick = () => {
    saveStateToStorage(!isOpen, module);
    setIsOpen(!isOpen);
  };
  const startHeight = isOpen ? "0" : "331";
  const stopHeight = isOpen ? "331" : "35";

  return (
    <AnimatedMenu start={startHeight} stop={stopHeight}>
      <HeaderWrapper>
        <Header>
          <img src={ExplorerIcon} alt="explorerIcon" />
          {textResources.Explorer_view}
        </Header>
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
