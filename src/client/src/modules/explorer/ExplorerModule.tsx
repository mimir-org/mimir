import { ProjectComponent } from "./";
import { MODULE_TYPE } from "../../models/project";
import { AnimatedModule } from "../../compLibrary/animated";
import { Size } from "../../compLibrary/size";
import { ModuleHeader, ModuleBody } from "./styled";
import { OnToggleClick } from "./handlers";
import { ExplorerIcon } from "../../assets/icons/modules";
import { useAppDispatch, useAppSelector, useParametricAppSelector } from "../../redux/store/hooks";
import { animatedModuleSelector, explorerSelector } from "../../redux/store";

/**
 * Component for the Explorer Module in Mimir.
 * @returns a module where all nodes in Mimir are listed.
 */
export const ExplorerModule = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(explorerSelector);
  const type = MODULE_TYPE.EXPLORER;
  const animate = useParametricAppSelector(animatedModuleSelector, type);

  const start = isOpen ? Size.ModuleClosed : Size.ModuleOpen;
  const stop = isOpen ? Size.ModuleOpen : Size.ModuleClosed;

  return (
    <AnimatedModule type={type} start={start} stop={stop} run={animate} id="ExplorerModule">
      <ModuleHeader isOpen={isOpen} onClick={() => OnToggleClick(dispatch, isOpen, type)}>
        <p className="text">{type}</p>
        <img className="icon" src={ExplorerIcon} alt="toggle" />
      </ModuleHeader>
      <ModuleBody visible={isOpen}>
        <ProjectComponent />
      </ModuleBody>
    </AnimatedModule>
  );
};

export default ExplorerModule;
