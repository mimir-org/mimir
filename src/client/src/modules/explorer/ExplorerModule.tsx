import { ProjectComponent } from "./";
import { TextResources } from "../../assets/text";
import { MODULE_TYPE } from "../../models/project";
import { AnimatedModule, Size } from "../../compLibrary";
import { IsBlockView } from "../../components/flow/block/helpers";
import { ModuleHead, ModuleBody } from "../../compLibrary/box/modules";
import { OnToggleClick } from "./handlers";
import { ExplorerIcon } from "../../assets/icons/modules";
import { useAppDispatch, useAppSelector, useParametricAppSelector } from "../../redux/store/hooks";
import { animatedModuleSelector, explorerSelector, projectSelector } from "../../redux/store";

/**
 * Component for the Explorer Module in Mimir.
 * @returns a module where all nodes in Mimir are listed.
 */
export const ExplorerModule = ({ elements }) => {
  const dispatch = useAppDispatch();
  const type = MODULE_TYPE.EXPLORER;
  const project = useAppSelector(projectSelector);
  const isOpen = useAppSelector(explorerSelector);
  const animate = useParametricAppSelector(animatedModuleSelector, type);

  const start = isOpen ? Size.ModuleClosed : Size.ModuleOpen;
  const stop = isOpen ? Size.ModuleOpen : Size.ModuleClosed;

  return (
    <AnimatedModule type={type} start={start} stop={stop} run={animate} id="ExplorerModule">
      <ModuleHead explorer visible={isOpen}>
        <img className="icon" src={ExplorerIcon} alt="toggle" onClick={() => OnToggleClick(dispatch, isOpen, type)} />
        <p className="text">{TextResources.Module_Explorer}</p>
      </ModuleHead>
      <ModuleBody visible={isOpen} explorer isBlockView={IsBlockView()}>
        {project && <ProjectComponent project={project} elements={elements} nodes={project.nodes ?? []} />}
      </ModuleBody>
    </AnimatedModule>
  );
};

export default ExplorerModule;
