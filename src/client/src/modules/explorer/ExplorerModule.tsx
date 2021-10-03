import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { ProjectComponent, SplitViewComponent } from "./";
import { TextResources } from "../../assets/text";
import { MODULE_TYPE } from "../../models/project";
import { AnimatedModule, Size } from "../../compLibrary";
import { IsBlockView } from "../../components/flow/block/helpers";
import { ModuleHead, ModuleBody } from "../../compLibrary/box/modules";
import { Project } from "../../models";
import { OnToggleClick } from "./handlers";
import { ExplorerIcon } from "../../assets/icons/common";

/**
 * Component for the Explorer Module in Mimir.
 * @returns a module where all nodes in Mimir are listed.
 */
export const ExplorerModule = () => {
  const dispatch = useDispatch();
  const type = MODULE_TYPE.EXPLORER;

  const project = useSelector<RootState>((state) => state.projectState.project) as Project;

  const animate = useSelector<RootState>(
    (state) => state.modules.types.find((x) => x.type === type).animate
  ) as boolean;

  const isOpen = useSelector<RootState>(
    (state) => state.modules.types.find((x) => x.type === type).visible
  ) as boolean;

  const start = isOpen ? Size.ModuleClosed : Size.ModuleOpen;
  const stop = isOpen ? Size.ModuleOpen : Size.ModuleClosed;

  return (
    <AnimatedModule type={type} start={start} stop={stop} run={animate} id="ExplorerModule">
      <ModuleHead explorer visible={isOpen}>
        <img
          className="icon"
          src={ExplorerIcon}
          alt="toggle"
          onClick={() => OnToggleClick(dispatch, isOpen, type)}
        />
        <p className="text">{TextResources.Module_Explorer}</p>
      </ModuleHead>
      <ModuleBody visible={isOpen} explorer isBlockView={IsBlockView()}>
        {project && <ProjectComponent project={project} nodes={project.nodes ?? []} />}
        <SplitViewComponent />
      </ModuleBody>
    </AnimatedModule>
  );
};

export default ExplorerModule;
