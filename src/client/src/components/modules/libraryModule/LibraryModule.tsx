import textResources from "../../../textResources";
import AnimatedMenu from "./styled/animated/AnimatedMenu";
import { LibraryIcon } from "../../../assets";
import { Header, SidebarWrapper, HeaderWrapper } from "./styled";
import { ToggleLibraryButton } from "../../../assets/buttons/index";
import Sidebar from "../../treeview/flow/dragAndDrop/Sidebar";
import { useState } from "react";
import {
  saveStateToAllModules,
  loadStateFromStorage,
  saveStateToStorage,
} from "../../../redux/store/localStorage/LocalStorage";

const LibraryModule = () => {
  const key = "library";
  const [isOpen, setIsOpen] = useState(loadStateFromStorage(key));

  const handleClick = () => {
    saveStateToStorage(!isOpen, key);
    setIsOpen(!isOpen);
    saveStateToAllModules("false");
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
