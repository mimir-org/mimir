import { useState } from "react";
import { InstructionBoxComponent } from "./InstructionBoxComponent";
import { Tooltip } from "../../../compLibrary/tooltip/Tooltip";
import { TextResources } from "../../../assets/text/TextResources";
import { Icon } from "../../../compLibrary/icon/Icon";
import { ProjectMenuComponent } from "../../menus/projectMenu";
import { CollapseWhiteIcon, ExpandWhiteIcon } from "../../../assets/icons/chevron";
import { ProjectHeaderButtonContainer, ProjectHeaderButton } from "./ProjectMenuHeaderComponent.styled";
import { MimirProject } from "../../../lib/classes/MimirProject";
import { MENU_TYPE } from "../../../lib/types/enums/MenuTypes";

/**
 * Component for the ProjectMenu element in the header of Mimir.
 * @returns a clickable element that toggles the ProjectMenuComponent.
 */
interface ProjectMenuHeaderProps {
  isInstructionOpen: boolean;
  project: MimirProject;
  activeMenu: MENU_TYPE;
}
export const ProjectMenuHeaderComponent = ({ isInstructionOpen, project, activeMenu }: ProjectMenuHeaderProps) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <ProjectHeaderButtonContainer>
      <Tooltip content={TextResources.PROJECT_DESCRIPTION} placement={"bottom"} offset={[0, 8]}>
        <ProjectHeaderButton isOpen={isUserMenuOpen} onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
          <span>{project.name ?? TextResources.PROJECT}</span>
          <Icon size={10} src={isUserMenuOpen ? CollapseWhiteIcon : ExpandWhiteIcon} alt="" />
        </ProjectHeaderButton>
      </Tooltip>
      {isUserMenuOpen && (
        <ProjectMenuComponent setIsUserMenuOpen={setIsUserMenuOpen} project={project} activeMenu={activeMenu} dispatch={null} />
      )}
      {isInstructionOpen && <InstructionBoxComponent />}
    </ProjectHeaderButtonContainer>
  );
};
