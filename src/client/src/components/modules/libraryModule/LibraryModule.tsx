import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import textResources from "../../../textResources";
import AnimatedMenu from "./styled/animated/AnimatedMenu";
import useLibraryToggleChangeHandler from "./hooks/useLibraryToggleChangeHandler";
import { LibraryIcon } from "../../../assets";
import { Header, SidebarWrapper, HeaderWrapper } from "./styled";
import { ToggleLibraryButton } from "../../../assets/buttons/index";
import Sidebar from "../../treeview/flow/dragAndDrop/Sidebar";

const LibraryModule = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector<RootState>(
    (state) => state.showLibraryReducer.visible
  );
  const handleClick = useLibraryToggleChangeHandler(dispatch, isOpen);

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
