import { Dispatch } from "redux";
import { ProjectComponent } from "./components/ProjectComponent";
import { MODULE_TYPE } from "../../models/project";
import { AnimatedModule } from "../../compLibrary/animated";
import { Size } from "../../compLibrary/size";
import { ExplorerModuleBody, ExplorerModuleHeader } from "./ExplorerModule.styled";
import { OnToggleClick } from "./handlers/OnToggleClick";
import { ExplorerIcon } from "../../assets/icons/modules";
import { Tooltip } from "../../compLibrary/tooltip/Tooltip";
import { Icon } from "../../compLibrary/icon";
import { TextResources } from "../../assets/text";
import { useAppSelector, useParametricAppSelector, animatedModuleSelector, explorerSelector } from "../../redux/store";

interface Props {
  dispatch: Dispatch;
}

/**
 * Component for the Explorer Module in Mimir.
 * @param interface
 * @returns a module where all nodes in Mimir are listed.
 */
export const ExplorerModule = ({ dispatch }: Props) => {
  const isOpen = useAppSelector(explorerSelector);
  const type = MODULE_TYPE.EXPLORER;
  const animate = useParametricAppSelector(animatedModuleSelector, type);

  const start = isOpen ? Size.ModuleClosed : Size.ModuleOpen;
  const stop = isOpen ? Size.ModuleOpen : Size.ModuleClosed;

  return (
    <AnimatedModule type={type} start={start} stop={stop} run={animate} id="ExplorerModule">
      <Tooltip
        content={isOpen ? TextResources.Explorer_Close_Panel : TextResources.Explorer_Expand_Panel}
        placement={"bottom"}
        offset={[0, -10]}
      >
        <ExplorerModuleHeader isOpen={isOpen} onClick={() => OnToggleClick(dispatch, isOpen, type)}>
          <span>{type}</span>
          <Icon size={24} src={ExplorerIcon} alt="toggle" />
        </ExplorerModuleHeader>
      </Tooltip>
      <ExplorerModuleBody visible>{isOpen && <ProjectComponent />}</ExplorerModuleBody>
    </AnimatedModule>
  );
};

export default ExplorerModule;
