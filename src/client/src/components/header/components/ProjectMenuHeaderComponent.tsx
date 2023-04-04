import { useState } from "react";
import { InstructionBoxComponent } from "./InstructionBoxComponent";
import { Tooltip } from "../../../compLibrary/tooltip/Tooltip";
import { TextResources } from "../../../assets/text/TextResources";
import { Icon } from "../../../compLibrary/icon/Icon";
import { MENU_TYPE } from "../../../models/project";
import { ProjectMenuComponent } from "../../menus/projectMenu";
import { CollapseWhiteIcon, ExpandWhiteIcon } from "../../../assets/icons/chevron";
import { ProjectHeaderButtonContainer, ProjectHeaderButton } from "./ProjectMenuHeaderComponent.styled";
import { isActiveMenuSelector, projectNameSelector } from "../../../redux/store";
import { useAppSelector, useParametricAppSelector } from "store";

/**
 * Component for the ProjectMenu element in the header of Mimir.
 * @returns a clickable element that toggles the ProjectMenuComponent.
 */
export const ProjectMenuHeaderComponent = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const projectName = useAppSelector(projectNameSelector);
  const isInstructionOpen = useParametricAppSelector(isActiveMenuSelector, MENU_TYPE.INSTRUCTION_PROJECT_MENU) && !isUserMenuOpen;

  return (
    <ProjectHeaderButtonContainer>
      <Tooltip content={TextResources.PROJECT_DESCRIPTION} placement={"bottom"} offset={[0, 8]}>
        <ProjectHeaderButton isOpen={isUserMenuOpen} onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
          <span>{projectName ?? TextResources.PROJECT}</span>
          <Icon size={10} src={isUserMenuOpen ? CollapseWhiteIcon : ExpandWhiteIcon} alt="" />
        </ProjectHeaderButton>
      </Tooltip>
      {isUserMenuOpen && <ProjectMenuComponent setIsUserMenuOpen={setIsUserMenuOpen} />}
      {isInstructionOpen && <InstructionBoxComponent />}
    </ProjectHeaderButtonContainer>
  );
};
