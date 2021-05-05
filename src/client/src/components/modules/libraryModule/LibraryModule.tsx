import textResources from "../../../textResources";
import AnimatedMenu from "./styled/animated/AnimatedMenu";
import { LegendWrapper } from "../legendModule/styled";
import { LegendModule } from "../legendModule";
import { LibrarySidebar } from "./index";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { LibraryState } from "../../../redux/store/library/types";
import { searchLibrary } from "../../../redux/store/library/actions";
import { changeModuleVisibility } from "../../../redux/store/modules/actions";
import { LibraryIcon, ToggleIconLeft, ToggleIconRight } from "../../../assets";
import {
  LoadState,
  SaveState,
} from "../../../redux/store/localStorage/localStorage";

import {
  Header,
  SidebarWrapper,
  HeaderWrapper,
  CollapsedIcon,
  LibraryWrapper,
} from "./styled";

const LibraryModule = () => {
  const key = "library";
  const dispatch = useDispatch();
  const [isOpen, setIsOpen]: [boolean, any] = useState(LoadState(key));
  const [animate, setAnimate] = useState(false);
  const state = useSelector<RootState>(
    (state) => state.library
  ) as LibraryState;

  useEffect(() => {
    dispatch(searchLibrary(""));
  }, [dispatch]);

  const handleClick = () => {
    SaveState(!isOpen, key);
    setIsOpen(!isOpen);
    setAnimate(true);
    dispatch(changeModuleVisibility(key, !isOpen));
  };

  const startHeight = isOpen ? "35" : "331";
  const stopHeight = isOpen ? "331" : "35";

  return (
    <AnimatedMenu start={startHeight} stop={stopHeight} run={animate}>
      <LibraryWrapper visible={isOpen}>
        <HeaderWrapper>
          <img
            src={isOpen ? ToggleIconRight : ToggleIconLeft}
            alt="toggle-icon"
            style={{ cursor: "pointer" }}
            onClick={handleClick}
          />
          <Header>
            <img src={LibraryIcon} alt="library-icon" />
            {textResources.Library_Heading}
          </Header>
        </HeaderWrapper>
        <CollapsedIcon visible={isOpen}>
          <img src={LibraryIcon} alt="library-icon" />
        </CollapsedIcon>
        <SidebarWrapper visible={isOpen}>
          <LibrarySidebar nodes={state.nodes} />
        </SidebarWrapper>
      </LibraryWrapper>
      <LegendWrapper visible={isOpen}>
        <LegendModule visible={isOpen} />
      </LegendWrapper>
    </AnimatedMenu>
  );
};

export default LibraryModule;
