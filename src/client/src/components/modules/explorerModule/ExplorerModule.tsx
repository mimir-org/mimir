import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { useState } from "react";
import { ExplorerIcon, ToggleIconLeft, ToggleIconRight } from "../../../assets";
import ProjectComponent from "./projectComponent/ProjectComponent";
import { SwitchViewComponent } from "./switchviewComponent/SwitchViewComponent";
import textResources from "../../../textResources";
import { changeModuleVisibility } from "../../../redux/store/modules/actions";
import { AnimatedModule, ModuleHeader, Size } from "../../../componentLibrary";
import { MODULE_TYPE } from "../../../models/project";
import {
  LoadState,
  SaveState,
} from "../../../redux/store/localStorage/localStorage";
import { ContentWrapper, CollapsedIcon, ExplorerFooterWrapper } from "./styled";

export const ExplorerModule = () => {
  const dispatch = useDispatch();
  const key = MODULE_TYPE.EXPLORER;
  const [isOpen, setIsOpen] = useState(LoadState(key));
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    SaveState(!isOpen, key);
    setIsOpen(!isOpen);
    setAnimate(true);
    dispatch(changeModuleVisibility(key, !isOpen));
  };

  const start = isOpen ? Size.ModuleClosed : Size.ModuleOpen;
  const stop = isOpen ? Size.ModuleOpen : Size.ModuleClosed;

  const hasProject = useSelector<RootState>(
    (state) => state.projectState.project !== null
  );

  return (
    <AnimatedModule start={start} stop={stop} run={animate}>
      <ModuleHeader left>
        <img src={ExplorerIcon} alt="explorerIcon" />
        <img
          className="icon"
          src={isOpen ? ToggleIconLeft : ToggleIconRight}
          alt="toggle"
          onClick={handleClick}
        />
        <p className="text">{textResources.Explorer_view}</p>
      </ModuleHeader>
      {/* 
      <CollapsedIcon visible={isOpen}>
        <img src={ExplorerIcon} alt="explorerIcon" />
      </CollapsedIcon> */}
      {hasProject && (
        <ContentWrapper visible={isOpen}>
          <ProjectComponent />
        </ContentWrapper>
      )}
      <ExplorerFooterWrapper visible={isOpen}>
        <SwitchViewComponent />
      </ExplorerFooterWrapper>
    </AnimatedModule>
  );
};

export default ExplorerModule;
