import textResources from "../../../textResources";
import AnimatedMenu from "./styled/animated/AnimatedMenu";
import { LibraryIcon } from "../../../assets";
import { Header, SidebarWrapper, HeaderWrapper } from "./styled";
import { ToggleLibraryButton } from "../../../assets/buttons/index";
import Sidebar from "../../treeview/flow/dragAndDrop/Sidebar";
import { useState } from "react";
import {
  loadStateFromStorage,
  saveStateToStorage,
} from "../../../redux/localStorage/localStorage";

const LibraryModule = () => {
  const [isOpen, setIsOpen] = useState(loadStateFromStorage("library"));

  const handleClick = () => {
    saveStateToStorage(!isOpen, "library");
    setIsOpen(!isOpen);
  };

  const startHeight = isOpen ? "0" : "331";
  const stopHeight = isOpen ? "331" : "35";

  return (
    <AnimatedMenu start={startHeight} stop={stopHeight}>
      <HeaderWrapper>
        <ToggleLibraryButton visible={isOpen} onClick={handleClick} />
        <Header>
          <img src={LibraryIcon} alt="library-icon" />
          {textResources.Library_Heading}
        </Header>
      </HeaderWrapper>
      <SidebarWrapper>
        <Sidebar />
      </SidebarWrapper>
    </AnimatedMenu>
  );
};

export default LibraryModule;
