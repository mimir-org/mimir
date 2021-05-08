import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { ExplorerIcon, ToggleIconLeft, ToggleIconRight } from "../../../assets";
import { ProjectComponent, SwitchViewComponent } from "./";
import textResources from "../../../textResources";
import { changeModuleVisibility } from "../../../redux/store/modules/actions";
import { MODULE_TYPE } from "../../../models/project";
import { SaveState } from "../../../redux/store/localStorage/localStorage";
import {
  AnimatedModule,
  ModuleHeader,
  ModuleBody,
  Size,
} from "../../../componentLibrary";

export const ExplorerModule = () => {
  const dispatch = useDispatch();
  const key = MODULE_TYPE.EXPLORER;

  const animate = useSelector<RootState>(
    (state) => state.modules.types.find((x) => x.type === key).animate
  ) as boolean;

  const isOpen = useSelector<RootState>(
    (state) => state.modules.types.find((x) => x.type === key).visible
  ) as boolean;

  const handleClick = () => {
    SaveState(!isOpen, key);
    dispatch(changeModuleVisibility(key, !isOpen, true));
  };

  const hasProject = useSelector<RootState>(
    (state) => state.projectState.project !== null
  );

  const start = isOpen ? Size.ModuleClosed : Size.ModuleOpen;
  const stop = isOpen ? Size.ModuleOpen : Size.ModuleClosed;

  return (
    <AnimatedModule start={start} stop={stop} run={animate}>
      <ModuleHeader left visible={isOpen}>
        <img src={ExplorerIcon} alt="explorerIcon" />
        <img
          className="icon"
          src={isOpen ? ToggleIconLeft : ToggleIconRight}
          alt="toggle"
          onClick={handleClick}
        />
        <p className="text">{textResources.Explorer_view}</p>
      </ModuleHeader>
      <ModuleBody visible={isOpen}>
        {hasProject && <ProjectComponent visible={isOpen} />}
        <SwitchViewComponent />
      </ModuleBody>
    </AnimatedModule>
  );
};

export default ExplorerModule;
