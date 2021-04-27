import textResources from "../../../textResources";
import AnimatedMenu from "./styled/animated/AnimatedMenu";
import { LibraryIcon, ToggleIconLeft, ToggleIconRight } from "../../../assets";
import { Header, SidebarWrapper, HeaderWrapper, CollapsedIcon } from "./styled";
import { LibrarySidebar } from "./index";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { LibraryState } from "../../../redux/store/library/types";
import { searchLibrary } from "../../../redux/store/library/actions";
import {
  loadStateFromStorage,
  saveStateToStorage,
} from "../../../redux/store/localStorage/localStorage";

const LibraryModule = () => {
  const key = "library";
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(loadStateFromStorage(key));
  const [animate, setAnimate] = useState(false);
  const state = useSelector<RootState>(
    (state) => state.library
  ) as LibraryState;

  useEffect(() => {
    dispatch(searchLibrary(""));
  }, [dispatch]);

  const handleClick = () => {
    saveStateToStorage(!isOpen, key);
    setIsOpen(!isOpen);
    setAnimate(true);
  };

  const startHeight = isOpen ? "35" : "331";
  const stopHeight = isOpen ? "331" : "35";

  return (
    <AnimatedMenu start={startHeight} stop={stopHeight} run={animate}>
      <HeaderWrapper>
        {isOpen ? (
          <img src={ToggleIconRight} alt="toggle-icon" onClick={handleClick} />
        ) : (
          <img src={ToggleIconLeft} alt="toggle-icon" onClick={handleClick} />
        )}
        <Header>
          <img src={LibraryIcon} alt="library-icon" />
          {textResources.Library_Heading}
        </Header>
      </HeaderWrapper>
      <CollapsedIcon visible={isOpen}>
        <img src={LibraryIcon} alt="explorerIcon" />
      </CollapsedIcon>
      <SidebarWrapper visible={isOpen}>
        <LibrarySidebar nodes={state.nodes} />
      </SidebarWrapper>
    </AnimatedMenu>
  );
};

export default LibraryModule;
