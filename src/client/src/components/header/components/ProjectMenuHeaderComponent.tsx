import * as selectors from "../../home/helpers/selectors";
import InstructionBoxComponent from "./InstructionBoxComponent";
import { useState } from "react";
import { Tooltip } from "../../../compLibrary/tooltip/Tooltip";
import { TextResources } from "../../../assets/text/TextResources";
import { Icon } from "../../../compLibrary/icon";
import { MENU_TYPE } from "../../../models/project";
import { ProjectMenuComponent } from "../../menus/projectMenu";
import { CollapseWhiteIcon, ExpandWhiteIcon } from "../../../assets/icons/chevron";
import { ProjectHeaderButtonContainer, ProjectHeaderButton } from "./ProjectMenuHeaderComponent.styled";
import { useAppSelector, useParametricAppSelector, isActiveMenuSelector } from "../../../redux/store";

/**
 * Component for the ProjectMenu element in the header of Mimir.
 * @returns a clickable element that toggles the ProjectMenuComponent.
 */
export const ProjectMenuHeaderComponent = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const projectName = useAppSelector(selectors.projectNameSelector);
  const isInstructionOpen = useParametricAppSelector(isActiveMenuSelector, MENU_TYPE.INSTRUCTION_PROJECT_MENU) && !isUserMenuOpen;

  return (
    <ProjectHeaderButtonContainer>
      <Tooltip content={TextResources.Project_Description} placement={"bottom"} offset={[0, 8]}>
        <ProjectHeaderButton isOpen={isUserMenuOpen} onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
          <span>{projectName ?? TextResources.Project}</span>
          <Icon size={10} src={isUserMenuOpen ? CollapseWhiteIcon : ExpandWhiteIcon} alt="" />
        </ProjectHeaderButton>
      </Tooltip>
      {isUserMenuOpen && <ProjectMenuComponent setIsUserMenuOpen={setIsUserMenuOpen} />}
      {isInstructionOpen && <InstructionBoxComponent />}
    </ProjectHeaderButtonContainer>
  );
};
