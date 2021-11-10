import { memo } from "react";
import { ProjectComponent } from "./";
import { MODULE_TYPE } from "../../models/project";
import { AnimatedModule, Size } from "../../compLibrary";
import { IsBlockView } from "../../helpers";
import { ModuleHead, ModuleBody } from "../../compLibrary/box/modules";
import { OnToggleClick } from "./handlers";
import { ExplorerIcon } from "../../assets/icons/modules";
import { useAppDispatch, useAppSelector, useParametricAppSelector } from "../../redux/store/hooks";
import { animatedModuleSelector, explorerSelector } from "../../redux/store";

interface Props {
  elements?: any[];
}

/**
 * Component for the Explorer Module in Mimir.
 * @returns a module where all nodes in Mimir are listed.
 */
export const ExplorerModule = ({ elements }: Props) => {
  const dispatch = useAppDispatch();
  const type = MODULE_TYPE.EXPLORER;
  const isOpen = useAppSelector(explorerSelector);
  const animate = useParametricAppSelector(animatedModuleSelector, type);

  const start = isOpen ? Size.ModuleClosed : Size.ModuleOpen;
  const stop = isOpen ? Size.ModuleOpen : Size.ModuleClosed;
  console.log("test");

  return (
    <AnimatedModule type={type} start={start} stop={stop} run={animate} id="ExplorerModule">
      <ModuleHead explorer visible={isOpen}>
        <img className="icon" src={ExplorerIcon} alt="toggle" onClick={() => OnToggleClick(dispatch, isOpen, type)} />
        <p className="text">{type}</p>
      </ModuleHead>
      <ModuleBody visible={isOpen} explorer isBlockView={IsBlockView()}>
        {/* {project && (
          <ProjectComponent
            elements={elements}
          />
        )} */}
      </ModuleBody>
    </AnimatedModule>
  );
};

export default memo(ExplorerModule);
