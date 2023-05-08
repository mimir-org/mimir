import { BlockProjectComponent } from "./explorerBlock/BlockProjectComponent";
import { MODULE_TYPE } from "../../models/project";
import { AnimatedModule } from "../../compLibrary/animated/AnimatedModule";
import { Size } from "../../assets/size/Size";
import { ExplorerIcon } from "../../assets/icons/modules";
import { Tooltip } from "../../compLibrary/tooltip/Tooltip";
import { Icon } from "../../compLibrary/icon/Icon";
import { TextResources } from "../../assets/text/TextResources";
import { ExplorerModuleBody, ExplorerModuleHeader } from "./shared/styled/ExplorerModule.styled";
import { useAppSelector } from "store";
import { Dispatch } from "redux";

interface Props {
  dispatch: Dispatch;
}

/**
 * Component for the Explorer Module in Mimir's BlockView.
 * @returns a module where all nodes in Mimir are listed.
 */
export const ExplorerBlockModule = ({ dispatch }: Props) => {
  const isOpen = false; //useAppSelector(explorerSelector);
  const type = MODULE_TYPE.EXPLORER;

  const start = isOpen ? Size.MODULE_CLOSED : Size.MODULE_OPEN;
  const stop = isOpen ? Size.MODULE_OPEN : Size.MODULE_CLOSED;

  return (
    <AnimatedModule type={type} start={start} stop={stop} run id="ExplorerBlockModule">
      <Tooltip content={isOpen ? TextResources.CLOSE_PANEL : TextResources.EXPAND_PANEL} placement={"bottom"} offset={[0, -10]}>
        <ExplorerModuleHeader onClick={() => null}>
          {isOpen && <span>{type}</span>}
          <Icon size={24} src={ExplorerIcon} alt="" />
        </ExplorerModuleHeader>
      </Tooltip>
      <ExplorerModuleBody>{isOpen && <BlockProjectComponent />}</ExplorerModuleBody>
    </AnimatedModule>
  );
};
