import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { ProjectComponent, SwitchViewComponent } from "./";
import { TextResources } from "../../../assets/textResources";
import { changeModuleVisibility } from "../../../redux/store/modules/actions";
import { MODULE_TYPE } from "../../../models/project";
import { SaveState } from "../../../redux/store/localStorage/localStorage";
import { AnimatedModule, Size } from "../../../componentLibrary";
import { ExplorerIcon, ToggleLeft, ToggleRight } from "../../../assets/icons";
import {
  ModuleHeader,
  ModuleBody,
} from "../../../componentLibrary/box/modules";

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
      <ModuleHeader explorer visible={isOpen}>
        <img src={ExplorerIcon} alt="icon" />
        <img
          className="icon"
          src={isOpen ? ToggleLeft : ToggleRight}
          alt="toggle"
          onClick={handleClick}
        />
        <p className="text">{TextResources.Explorer_view}</p>
      </ModuleHeader>
      <ModuleBody visible={isOpen} explorer>
        {hasProject && <ProjectComponent />}
        <SwitchViewComponent />
      </ModuleBody>
    </AnimatedModule>
  );
};

export default ExplorerModule;
