import { useState } from "react";
import { InstructionBoxComponent } from "./InstructionBoxComponent";
import { Tooltip } from "../../../compLibrary/tooltip/Tooltip";
import { TextResources } from "../../../assets/text/TextResources";
import { Icon } from "../../../compLibrary/icon/Icon";
import { ProjectMenuComponent } from "../../menus/projectMenu";
import { CollapseWhiteIcon, ExpandWhiteIcon } from "../../../assets/icons/chevron";
import { ProjectHeaderButtonContainer, ProjectHeaderButton } from "./ProjectMenuHeaderComponent.styled";

interface ProjectMenuHeaderComponentProps {
  projectName: string;
}

/**
 * Component for the ProjectMenu element in the header of Mimir.
 * @returns a clickable element that toggles the ProjectMenuComponent.
 */
export const ProjectMenuHeaderComponent = ({ projectName }: ProjectMenuHeaderComponentProps) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <ProjectHeaderButtonContainer>
      <Tooltip content={TextResources.PROJECT_DESCRIPTION} placement={"bottom"} offset={[0, 8]}>
        <ProjectHeaderButton isOpen={isUserMenuOpen} onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
          <span>{projectName ?? TextResources.PROJECT}</span>
          <Icon size={10} src={isUserMenuOpen ? CollapseWhiteIcon : ExpandWhiteIcon} alt="" />
        </ProjectHeaderButton>
      </Tooltip>
      {isUserMenuOpen && <ProjectMenuComponent setIsUserMenuOpen={setIsUserMenuOpen} />}
      {projectName == null && !isUserMenuOpen && <InstructionBoxComponent />}
    </ProjectHeaderButtonContainer>
  );
};
