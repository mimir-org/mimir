import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { ProjectComponent, SplitViewComponent } from "./";
import { TextResources } from "../../../assets/textResources";
import { changeModuleVisibility } from "../../../redux/store/modules/actions";
import { MODULE_TYPE } from "../../../models/project";
import { AnimatedModule, Size } from "../../../compLibrary";
import { IsBlockView } from "../../flow/helpers/block";
import { ModuleHead, ModuleBody } from "../../../compLibrary/box/modules";
import {
  ExplorerIcon,
  ToggleLeft,
  ToggleRight,
} from "../../../assets/icons/common";

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
    dispatch(changeModuleVisibility(key, !isOpen, true));
  };

  const hasProject = useSelector<RootState>(
    (state) => state.projectState.project !== null
  );

  const start = isOpen ? Size.ModuleClosed : Size.ModuleOpen;
  const stop = isOpen ? Size.ModuleOpen : Size.ModuleClosed;

  return (
    <AnimatedModule type={key} start={start} stop={stop} run={animate} id={key}>
      <ModuleHead explorer visible={isOpen}>
        <img src={ExplorerIcon} alt="icon" className="module-icon" />
        <img
          className="icon"
          src={isOpen ? ToggleLeft : ToggleRight}
          alt="toggle"
          onClick={handleClick}
        />
        <p className="text">{TextResources.Explorer_view}</p>
      </ModuleHead>
      <ModuleBody visible={isOpen} explorer isBlockView={IsBlockView()}>
        {hasProject && <ProjectComponent />}
        <SplitViewComponent />
      </ModuleBody>
    </AnimatedModule>
  );
};

export default ExplorerModule;
