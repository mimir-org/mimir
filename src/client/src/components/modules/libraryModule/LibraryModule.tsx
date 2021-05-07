import textResources from "../../../textResources";
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
import { MODULE_TYPE } from "../../../models/project";
import { AnimatedModule, ModuleHeader, Size } from "../../../componentLibrary";
import { SidebarWrapper, LibraryWrapper } from "./styled";
import { SaveState } from "../../../redux/store/localStorage/localStorage";

const LibraryModule = () => {
  const key = MODULE_TYPE.LIBRARY;
  const dispatch = useDispatch();
  const [animate, setAnimate] = useState(false);
  const state = useSelector<RootState>(
    (state) => state.library
  ) as LibraryState;

  const isOpen = useSelector<RootState>(
    (state) => state.modules.type.find((x) => x.type === key).visible
  ) as boolean;

  useEffect(() => {
    dispatch(searchLibrary(""));
  }, [dispatch]);

  const handleClick = () => {
    SaveState(!isOpen, key);
    setAnimate(true);
    dispatch(changeModuleVisibility(key, !isOpen));
  };

  const start = isOpen ? Size.ModuleClosed : Size.ModuleOpen;
  const stop = isOpen ? Size.ModuleOpen : Size.ModuleClosed;

  return (
    <AnimatedModule start={start} stop={stop} run={animate}>
      <LibraryWrapper visible={isOpen}>
        <ModuleHeader right visible={isOpen}>
          <img src={LibraryIcon} alt="library-icon" />
          <img
            className="icon"
            src={isOpen ? ToggleIconRight : ToggleIconLeft}
            alt="toggle"
            onClick={handleClick}
          />
          <p className="text">{textResources.Library_Heading}</p>
        </ModuleHeader>
        <SidebarWrapper visible={isOpen}>
          <LibrarySidebar nodes={state.nodes} />
        </SidebarWrapper>
      </LibraryWrapper>
      <LegendWrapper visible={isOpen}>
        <LegendModule visible={isOpen} />
      </LegendWrapper>
    </AnimatedModule>
  );
};

export default LibraryModule;
