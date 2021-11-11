import { ProjectComponent } from "./";
import { MODULE_TYPE } from "../../models/project";
import { AnimatedModule, Size } from "../../compLibrary";
import { IsBlockView } from "../../helpers";
import { ModuleHead, ModuleBody } from "../../compLibrary/box/modules";
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
      <ModuleHead explorer visible={isOpen}>
        <img className="icon" src={ExplorerIcon} alt="toggle" onClick={() => OnToggleClick(dispatch, isOpen, type)} />
        <p className="text">{type}</p>
      </ModuleHead>
      <ModuleBody visible={isOpen} explorer isBlockView={IsBlockView()}>
        <ProjectComponent />
      </ModuleBody>
    </AnimatedModule>
  );
};

export default ExplorerModule;
