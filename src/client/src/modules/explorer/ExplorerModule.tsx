import { ProjectComponent } from "./components/";
import { MODULE_TYPE } from "../../models/project";
import { AnimatedModule } from "../../compLibrary/animated";
import { Size } from "../../compLibrary/size/Size";
import { OnToggleClick } from "./handlers/OnToggleClick";
import { ExplorerIcon } from "../../assets/icons/modules";
import { Tooltip } from "../../compLibrary/tooltip/Tooltip";
import { Icon } from "../../compLibrary/icon";
import { TextResources } from "../../assets/text/TextResources";
import { ExplorerModuleBody, ExplorerModuleHeader } from "./ExplorerModule.styled";
import { useAppSelector, explorerSelector, useAppDispatch } from "../../redux/store";
import { memo } from "react";

/**
 * Component for the Explorer Module in Mimir.
 * @returns a module where all nodes in Mimir are listed.
 */
const ExplorerModule = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(explorerSelector);
  const type = MODULE_TYPE.EXPLORER;

  const start = isOpen ? Size.MODULE_CLOSED : Size.MODULE_OPEN;
  const stop = isOpen ? Size.MODULE_OPEN : Size.MODULE_CLOSED;

  return (
    <AnimatedModule type={type} start={start} stop={stop} run id="ExplorerModule">
      <Tooltip
        content={isOpen ? TextResources.EXPLORER_CLOSE_PANEL : TextResources.EXPLORER_EXPAND_PANEL}
        placement={"bottom"}
        offset={[0, -10]}
      >
        <ExplorerModuleHeader onClick={() => OnToggleClick(dispatch, type)}>
          {isOpen && <span>{type}</span>}
          <Icon size={24} src={ExplorerIcon} alt="" />
        </ExplorerModuleHeader>
      </Tooltip>
      <ExplorerModuleBody>{isOpen && <ProjectComponent />}</ExplorerModuleBody>
    </AnimatedModule>
  );
};

export default memo(ExplorerModule);
