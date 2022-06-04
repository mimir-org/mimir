import { TreeProjectComponent } from "./explorerTree/TreeProjectComponent";
import { MODULE_TYPE } from "../../models/project";
import { AnimatedModule } from "../../compLibrary/animated/AnimatedModule";
import { Size } from "../../compLibrary/size/Size";
import { OnToggleExplorerClick } from "./shared/handlers/OnToggleExplorerClick";
import { ExplorerIcon } from "../../assets/icons/modules";
import { Tooltip } from "../../compLibrary/tooltip/Tooltip";
import { Icon } from "../../compLibrary/icon/Icon";
import { TextResources } from "../../assets/text/TextResources";
import { ExplorerModuleBody, ExplorerModuleHeader } from "./shared/styled/ExplorerModule.styled";
import { useAppSelector, explorerSelector } from "../../redux/store";
import { Dispatch } from "redux";

interface Props {
  dispatch: Dispatch;
}

/**
 * Component for the Explorer Module in Mimir's TreeView.
 * @returns a module where all nodes in Mimir are listed.
 */
export const ExplorerTreeModule = ({ dispatch }: Props) => {
  const isOpen = useAppSelector(explorerSelector);
  const type = MODULE_TYPE.EXPLORER;

  const start = isOpen ? Size.MODULE_CLOSED : Size.MODULE_OPEN;
  const stop = isOpen ? Size.MODULE_OPEN : Size.MODULE_CLOSED;

  return (
    <AnimatedModule type={type} start={start} stop={stop} run id="ExplorerTreeModule">
      <Tooltip content={isOpen ? TextResources.CLOSE_PANEL : TextResources.EXPAND_PANEL} placement={"bottom"} offset={[0, -10]}>
        <ExplorerModuleHeader onClick={() => OnToggleExplorerClick(dispatch, type)}>
          {isOpen && <span>{type}</span>}
          <Icon size={24} src={ExplorerIcon} alt="" />
        </ExplorerModuleHeader>
      </Tooltip>
      <ExplorerModuleBody>{isOpen && <TreeProjectComponent dispatch={dispatch} />}</ExplorerModuleBody>
    </AnimatedModule>
  );
};
